import SoilAdvisorComponent from "../Components/SoilAdvisor1"

function SoilAdvisor() {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">🧠 AI ফসল সুপারিশ</h1>
      <SoilAdvisorComponent />
    </div>
  )
}

export default SoilAdvisor;
