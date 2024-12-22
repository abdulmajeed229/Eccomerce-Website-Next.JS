import Header from "../componets/header";
export default function ContactMe(){
    return(
    <>
    
    <Header/>


    <div className="font-[sans-serif] max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4">
      <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-blue-400"></div>
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400"></div>

      <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
        <div className="text-center flex flex-col items-center justify-center">
          <img src="https://readymadeui.com/signin-image.webp" className="shrink-0 w-5/6" />
        </div>

        <form className="rounded-tl-3xl rounded-bl-3xl">
          <h2 className="text-2xl text-blue-600 font-bold text-center mb-6">Contact us</h2>
          <div className="max-w-md mx-auto space-y-3 relative">
            <input type='text' placeholder='Name'
              className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
            <input type='email' placeholder='Email'
              className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
            <input type='email' placeholder='Phone No.'
              className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
            <textarea placeholder='Message'
              className="w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-blue-600 focus-within:bg-transparent"></textarea>

            <button type='button'
              className="text-white w-full relative bg-blue-500 hover:bg-blue-600 rounded-md text-sm px-6 py-3 !mt-6">
             
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>

    </>
    )
}