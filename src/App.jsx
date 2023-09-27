import Form from "./component/Form"
import Tabel from "./component/Tabel"

const App = () => {
  return (
    <section className="p-8">
      <div className="grid grid-cols-12 gap-12">
        <div className="lg:col-span-7 col-span-12">
          <Tabel />
        </div>
        <div className="lg:col-span-5 col-span-12">
          <Form />
        </div>
      </div>
    </section>
  )
}

export default App
