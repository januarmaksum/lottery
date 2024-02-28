import { useState, useRef } from "react";
import Countdown from "react-countdown";
import { zeroPad } from "react-countdown";

export default function Timer({ data, handleCloseTimer, handleRemovePegawai }) {
  const clockRef = useRef(null);
  const [isButton, setIsButton] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const dataLastWinner = data && data[0];
  const {
    undian_id,
    urut_menang_undian,
    nama_lengkap_pegawai,
    nama_unit_kerja,
    nama_sub_unit_kerja,
  } = dataLastWinner;
  const isLastWinner = urut_menang_undian <= 21;
  const setTimer = isLastWinner ? 20000 : 180000;

  const handleStart = () => {
    setIsStart(true);
    clockRef.current.start();
    setIsButton(false);
  };

  function screenTimer({ minutes, seconds }) {
    return (
      <>
        <div className="absolute right-16 top-10">
          <button
            onClick={() => handleCloseTimer?.()}
            className="bg-blue-800 tracking-widest text-white py-3 px-7 text-xl rounded-sm"
            type="button"
          >
            LANJUT
          </button>
        </div>
        <div className="absolute bottom-10 right-16">
          <button
            onClick={() => handleRemovePegawai?.(undian_id)}
            className="bg-red-800 tracking-widest text-white py-3 px-7 text-xl rounded-sm"
            type="button"
          >
            TIDAK HADIR
          </button>
        </div>
        <div className="flex h-screen justify-center items-center flex-col">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-[2rem]">🎉 SELAMAT KEPADA 🎉</span>
            <div className="text-[4rem] text-red-600">
              {nama_lengkap_pegawai}
            </div>
            <div className="text-[2rem] flex justify-center flex-col">
              <span>{nama_unit_kerja}</span>
              <span className="-mt-2">{nama_sub_unit_kerja}</span>
            </div>
            <div className="text-[4rem] mt-10">
              <div className="leading-[55px]">
                Untuk konfirmasi kehadiran pemenang, <br /> silakan hubungi
              </div>
              <div className="text-red-600">Claudia Sandra: 0812-9176-2342</div>
            </div>
          </div>
          {isButton && (
            <button
              className="bg-green-600 mt-7 tracking-widest text-white py-3 px-7 text-xl rounded-sm"
              type="button"
              onClick={() => handleStart()}
            >
              START TIMER
            </button>
          )}
          {isStart && (
            <div className="flex gap-3 text-center text-[15rem] leading-[17rem]">
              {isLastWinner && <div className="min-w-[21rem]">{seconds}</div>}
              {!isLastWinner && (
                <>
                  <div className="min-w-[21rem]">{zeroPad(minutes)}</div> :{" "}
                  <div className="min-w-[21rem]">{zeroPad(seconds)}</div>
                </>
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="fixed bg-white inset-0 z-[999999] overflow-hidden">
      <Countdown
        date={Date.now() + setTimer}
        renderer={screenTimer}
        ref={clockRef}
      />
    </div>
  );
}
