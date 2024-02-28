export default function ListWinners({ winners, handleClick }) {
  return (
    <div className="fixed right-7 top-56">
      <div className="bg-white border-double border-4 border-sky-500">
        <div className="flex justify-center relative">
          <h2 className="bg-gray-950 text-yellow-500 absolute inline-flex -top-5 text-center px-2 py-1 border-double border-4 border-sky-500">
            📌 DAFTAR PEMENANG 📌
          </h2>
        </div>
        <ol className="bg-white w-64 grid grid-cols-1 divide-y divide-yellow-600 divide-dashed pt-7 overflow-y-auto max-h-[30rem]">
          {winners?.map((item) => {
            return (
              <li key={item.pegawai_undian_id}>
                <button
                  className="flex w-full gap-2 leading-5 text-left flex-grow py-1 px-3 transition ease-in-out hover:text-red-700 duration-300"
                  type="button"
                  // onClick={() => handleClick?.(item)}
                >
                  <span className="min-w-[1rem] max-w-[1.5rem]">
                    {item.urut_menang_undian}.
                  </span>
                  <span className="flex-auto">{item.nama_lengkap_pegawai}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
