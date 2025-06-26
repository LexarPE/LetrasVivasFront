export default function BtnGeneral({content,textZ,eFuncion}){
  return (
    <button
      className='w-max bg-[#0B357F] text-white px-3 py-1 rounded-[10px] font-normal cursor-pointer'
      onClick={eFuncion}
      style={{fontSize : `${textZ}`}}
    >
      {content}
    </button>
  );
}