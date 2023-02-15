const Subscription = ({ isVip }) => {
    return (
    <div
      className=" bg-yellow-400 rounded-xl shadow-xl border border-black my-8 divide-y"
    >
      <div className="p-4">
        <div className="flex justify-end">
          <div className="bg-white rounded-full flex justify-center align-center px-4">
            <p className="text-black text-sm py-2 tracking-tighter font-bold">
              { isVip ? "VIP" : "Principiante" }
            </p>
          </div>
        </div>

        <div>
          <p className="text-black text-xl font-bold">
            { isVip ? "PRO" : "Prova" }
          </p>
          <p className="text-5xl text-stone-800 font-bold">
            { isVip ? "€40,00" : "GRATIS" }
          </p>
        </div>

        <div>
          <p className="text-lg font-medium">
            Per sempre
          </p>
          <p className="text-[#696a6b] text-lg font-medium">
            
            { isVip ? "Tutti i servizi VIP" : "Nessun servizio VIP" }
          </p>
        </div>
      </div>

      <div className="p-4 mb-6">
        <div>
          <p className="text-[#696a6b] text-sm font-medium">
          { isVip ? "Servizi esclusivi" : "Servizi base" }
          </p>
          <p className="text-[#696a6b] text-sm font-medium">
          { isVip ? "Spedizione gratis" : "Spedizione a pagamento" }
          </p>
          <p className="text-[#696a6b] text-sm font-medium">
          { isVip ? "Sconti esclusivi" : "Nessuno sconto" }
          </p>
          <p className="text-[#696a6b] text-sm font-medium">
          { isVip ? "Contest esclusivi" : "Nessun contest" }
            
          </p>
          <p className="text-[#696a6b] text-sm font-medium">
          { isVip ? "Servizi gratis occasionalmente" : "Tutti i servizi sono a pagamento" }
            
          </p>
        </div>

        <div className="mt-[25px]">
          <button className="bg-black rounded-lg p-4 text-yellow-400 text-sm font-semibold">
            Current Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
