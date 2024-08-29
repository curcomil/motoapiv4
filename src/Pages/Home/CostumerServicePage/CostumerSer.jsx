import FormService from "../../../Components/FormClient";
import { Navlink } from "../../../Components/Navbar_";
import { Footer } from "../../../Components/footer";
import imgFondo from "../../../../dist/assets/fondo_service.png";

function CostumerSer() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-black bg-[radial-gradient(circle,_rgba(14,255,6,1)_1%,_transparent_40%,_black_100%)] bg-cover bg-center bg-no-repeat">
        <Navlink />
        <br />
        <div className="flex flex-1 flex-col md:flex-row p-4 md:p-8 lg:p-16 xl:p-24 gap-4">
          <div className="hidden md:flex md:w-1/2 justify-center items-center">
            <img src={imgFondo} alt="Image" className="max-w-full h-auto" />
          </div>
          <div className="flex-1 flex justify-center items-center md:w-1/2">
            <FormService />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CostumerSer;
