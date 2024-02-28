import bgImage from "../assets/bg.png";
import axios from "axios";
import { useState, useEffect, Suspense, lazy, useRef } from "react";
import {
  GET_PEGAWAI,
  GET_PEMENANG,
  GET_LAST_WINNER,
  POST_PEGAWAI,
  POST_PRESENT,
} from "../utils/utils";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Error from "../components/Error";
import Header from "../components/Header";
import Title from "../components/Title";
import { useApiService } from "../services/api";

// audio files
import drumSound from "../assets/drum.mp3";
import fireworkSound from "../assets/firework.mp3";
import victorySound from "../assets/victory.mp3";
import Contact from "../components/Contact";
import Timer from "../components/Timer";

// lazy component
const Confetti = lazy(() => import("../components/Confetti"));
const ActionsApp = lazy(() => import("../components/ActionsApp"));
const ListWinners = lazy(() => import("../components/ListWinners"));
const Audio = lazy(() => import("../components/Audio"));

export default function Undian() {
  const location = useLocation();
  const path = location.pathname.toUpperCase();
  const kategori = GET_PEGAWAI + path;
  const pemenang = GET_PEMENANG + path;
  const lastWinner = GET_LAST_WINNER + path;

  // states
  const [pegawai, setPegawai] = useState(null);
  const [runParticle, setRunParticle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [openModalTimer, setOpenModalTimer] = useState(false);
  const [onStartTimer, setOnStartTimer] = useState(false);

  // get data
  const {
    data: dataPegawai,
    error: errorGetPegawai,
    isLoading: isLoadingPegawai,
    mutate: mutateGetPegawai,
  } = useApiService(kategori);

  const {
    data: dataPemenang,
    error: _errorGetPemenang,
    isLoading: _isLoadingPemenang,
    mutate: mutateGetPemenang,
  } = useApiService(pemenang);

  const {
    data: dataLastWinner,
    error: _errorGetLastWinner,
    isLoading: _isLoadingLastWinner,
    mutate: mutateLastWinner,
  } = useApiService(lastWinner);

  const startDrawRef = useRef(null);
  const victoryRef = useRef(null);
  const fireworkRef = useRef(null);

  // post data
  const postData = (data) => {
    const payload = {
      pegawai_undian_id: data.pegawai_undian_id,
      pegawai_id: data.pegawai_id ?? "",
      kategori: data.kategori_undian,
    };
    axios
      .post(POST_PEGAWAI, payload)
      .then((res) => {
        if (res.status === 200) {
          mutateGetPegawai();
          mutateGetPemenang();
          mutateLastWinner();
          setPegawai(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postPresent = (id) => {
    const payload = {
      undian_id: id,
    };
    axios
      .post(POST_PRESENT, payload)
      .then((res) => {
        if (res.status === 200) {
          mutateGetPemenang();
          mutateGetPegawai();
          setPegawai(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handlers
  const handleStart = () => {
    startInterval();
    playSoundDraw();
  };

  const handleStop = () => {
    stopInterval();
    setPegawai(dataPegawai[currentIndex]);
    stopSoundDraw();
    playSoundVictory();
  };

  const playSoundDraw = () => {
    startDrawRef.current.loop = true;
    startDrawRef.current.play();
  };

  const stopSoundDraw = () => {
    startDrawRef.current.pause();
  };

  const playSoundVictory = () => {
    victoryRef.current.loop = false;
    victoryRef.current.play();
    setTimeout(() => {
      playSoundFirework();
    }, 1000);
  };

  const playSoundFirework = () => {
    fireworkRef.current.loop = true;
    fireworkRef.current.play();
  };

  const stopSoundVictory = () => {
    victoryRef.current.pause();
    fireworkRef.current.pause();
  };

  const openModal = (isDetail, isDraw) => {
    const isDataDetail = isDraw?.nama_lengkap_pegawai ? true : false;
    const content = {
      body: `<div style="display: flex; flex-direction: column; gap: 8px; text-align: center">
              <h1 style='font-size: 3rem; color: red;'>${
                isDataDetail
                  ? isDraw.nama_lengkap_pegawai
                  : pegawai.nama_lengkap_pegawai
              }</h1>
              <div style='font-size: 1.5rem'>Unit: ${
                isDataDetail ? isDraw.nama_unit_kerja : pegawai.nama_unit_kerja
              }</div>
              <div style='font-size: 1.5rem'>Sub Unit: ${
                isDataDetail
                  ? isDraw.nama_sub_unit_kerja
                  : pegawai.nama_sub_unit_kerja
              }</div>
            </div>`,
    };
    Swal.fire({
      width: 800,
      title: isDetail
        ? "<span style='font-size: 2rem; color: black;'>🎉 DETAIL PEMENANG 🎉</span>"
        : "<span style='font-size: 2rem; color: black;'>🎉 SELAMAT KEPADA 🎉</span>",
      html: content.body,
      allowOutsideClick: false,
      backdrop: false,
      allowEscapeKey: false,
      confirmButtonText: `
        <span style='font-size: 1.5rem;'>${
          isDetail ? "Tutup" : "OK, LANJUT !"
        }</span>
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        setRunParticle(false);
        Swal.close();
        stopSoundVictory();
        // setOnStartTimer(true);
        setOpenModalTimer(true)
      }
    });
  };

  const startInterval = () => {
    setIsRunning(true);
  };

  const stopInterval = () => {
    setIsRunning(false);
  };

  const handleCloseTimer = () => {
    setOpenModalTimer(false);
  };

  const handleRemovePegawai = (id) => {
    postPresent(id);
    setOpenModalTimer(false);
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * dataPegawai.length);
        setCurrentIndex(randomIndex);
      }, 1); // Set the interval duration (in milliseconds)
    }

    if (!isRunning && pegawai?.nama_lengkap_pegawai) {
      postData(pegawai);
      setRunParticle(true);
      openModal();
    }

    // Cleanup function to clear the interval when the component unmounts or when isRunning becomes false
    return () => clearInterval(intervalId);
  }, [isRunning, pegawai]);

  if (errorGetPegawai) return <Error />;

  return (
    <>
      <Suspense fallback={""}>
        <Audio src={drumSound} attribute={startDrawRef} />
        <Audio src={victorySound} attribute={victoryRef} />
        <Audio src={fireworkSound} attribute={fireworkRef} />
      </Suspense>
      <Suspense fallback={""}>
        <Confetti run={runParticle} />
      </Suspense>
      <Suspense fallback={""}>
        <ListWinners winners={dataPemenang} />
      </Suspense>
      <Contact />
      <Header />

      {onStartTimer && (
        <div className="fixed bg-white inset-0 z-[999998] overflow-hidden">
          <div className="flex h-screen justify-center items-center flex-col">
            <div className="flex">
              <button
                onClick={() => {
                  setOpenModalTimer(true);
                  setOnStartTimer(false);
                }}
                className="bg-blue-800 tracking-widest text-white py-3 px-7 text-3xl rounded-sm"
                type="button"
              >
                MULAI HITUNG MUNDUR
              </button>
            </div>
            <div className="mt-4">
              {dataLastWinner?.[0].urut_menang_undian <= 21
                ? "Timer 20 Detik"
                : "Timer 3 Menit"}
            </div>
          </div>
        </div>
      )}

      {openModalTimer && (
        <Timer
          data={dataLastWinner}
          handleCloseTimer={handleCloseTimer}
          handleRemovePegawai={handleRemovePegawai}
        />
      )}

      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="mx-auto h-screen bg-no-repeat bg-cover bg-bottom flex flex-col items-center justify-center"
      >
        <Title className="relative top-16" />
        <div className="flex justify-center flex-col items-center">
          <div className="c-subscribe-box u-align-center">
            <div className="rainbow">
              <span></span>
              <span></span>
            </div>
            <div className="c-subscribe-box__wrapper text-center">
              <div className="flex justify-center flex-col items-center h-screen">
                <h1 className="text-[40px] mb-12">
                  {isRunning &&
                    dataPegawai &&
                    dataPegawai[currentIndex].nama_lengkap_pegawai}
                  {!isRunning && pegawai?.nama_lengkap_pegawai}
                </h1>
                {!pegawai && !isRunning && (
                  <div className="text-3xl tracking-widest text-gray-700">
                    . . .
                  </div>
                )}
              </div>
            </div>
          </div>
          <Suspense fallback={""}>
            <ActionsApp
              isRunning={isRunning}
              isLoading={isLoadingPegawai}
              handleStart={handleStart}
              handleStop={handleStop}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
