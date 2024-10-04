import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";
import { AiOutlineCopyright } from "react-icons/ai";

export default function Footer() {
  return (
    <div className='h-24 bg-tomato py-7 flex flex-col'>

        <div className='flex w-4/5 h-fit justify-center gap-10 mx-auto my-3
                        max-md:gap-5'>
            <div className='text-white text-[40px] rounded-md
                            max-md:text-[35px] 
                            hover:text-silver duration-500 ease-out opacity-100 cursor-pointer'>
                              < FaFacebookSquare/>
            </div>
            <div className='text-white text-[40px] rounded-md
                            max-md:text-[35px]
                            hover:text-silver duration-500 ease-out opacity-100 cursor-pointer'>
                              <FaXTwitter />
            </div>

            <div className='text-white text-[40px] rounded-md
                            max-md:text-[35px]
                            hover:text-silver duration-500 ease-out opacity-100 cursor-pointer'>
                              <BsInstagram />
            </div>

            <div className='text-white text-[40px] rounded-md
                            max-md:text-[35px]
                            hover:text-silver duration-500 ease-out opacity-100 cursor-pointer'>
                              <IoLogoYoutube />
            </div>

        </div>

        <div className='flex justify-center text-white py-1'>
          <AiOutlineCopyright className='mr-1 mt-[3.5px]
                                         max-md:mt-[1.5px] max-md:text-xs'/>
          <p className='text-center text-white font-bold
                        max-md:text-xs'>
              Savory Spoon | All Rights Reserved
          </p>
        </div>


    </div>
  )
}
