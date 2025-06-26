export default function HeaderSeccion({titulo,size}){
  return (
    <div className="bg-[#F6FAFF] py-3 px-5 rounded-4xl shadow-[#0b367f91] shadow-sm">
      <h4 className="text-[#0B357F] font-semibold" style={{fontSize:size}}>{titulo}</h4>
    </div>
  );
}