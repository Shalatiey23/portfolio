import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { 
    AiFillLinkedin,
    AiFillInstagram,
    AiFillGithub,
    AiOutlineTwitter
} from 'react-icons/ai'

  
import { isEmpty, isEmail } from '../utils/validation/validation'
import Loading from '../components/loading/Loading'
import { sendEmail } from '../lib/api'

const  initValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
}
const initState = {
    values: initValues,
    isLoading: false
}

const Contact = () => {
    const [state, setState] = useState(initState)

    const { values, isLoading } = state

    const handleChange = ({target}) => setState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]: target.value
        }
    }))

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isEmpty(values.name) || isEmpty(values.email) || isEmpty(values.subject) || isEmpty(values.message)) 
            return toast.error('Please fill in all fields.')

        if (!isEmail(values.email)) 
            return toast.error('Invalid email address.')
            
        setState((prev) => ({
            ...prev,
            isLoading
        }))

        try {
            await sendEmail(values)
            setState(initState)
        } catch (error) {
            setState({
                ...prev,
                isLoading: false,
                error: error.message
            })
        }
    }   

  return (
    <>
    <Head>
        <title>Contact</title>
        <meta name="description" content="Get in touch with Vutlhari Chauke" />
        <link rel="icon" href="/logo.png" />
    </Head>
    <div className={'h-40'}></div>
    <div className={'w-full mb-40 lg:h-screen'}>
        <div className={'max-w-[1240px] m-auto '}>
            <p className={'text-xl tracking-widest uppercase text-[#D4AF37] text-center font-bold'}>Contact</p>
            <h2 className={'py-4 text-center'}>Get In Touch</h2>
            <div className={'grid lg:grid-cols-5 gap-8'}>
                <div className={'col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-900 rounded-xl p-4'}>
                    <div className={'lg:p-4 h-full'}>
                        <div>
                            <Image className={'rounded-xl hover:scale-105 ease-in duration-300'} src={yourImage} alt="Vutlhari Chauke" width={'664'} height={'564'} />
                        </div>
                        <div className="">
                            <h2 className={'py-2'}>Full Stack Developer</h2> 
                            <p className={'py-4'}>
                                Passionate about building impactful digital solutions with modern technologies.
                            </p>
                        </div>
                        <div>
                            <p className={'uppercase pt-8'}>Connect with me</p>
                            <div className={'flex justify-between pt-5 ease-in duration-300'}>
                                <div className={'rounded-full shadow-lg shadow-gray-900 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                                    <Link href={'https://www.instagram.com/shalatiey23'}><AiFillInstagram size={20} /></Link>
                                </div>
                                <div className={'rounded-full shadow-lg shadow-gray-900 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                                    <Link href={'https://twitter.com/shalatiey23'}><AiOutlineTwitter size={20} /></Link>
                                </div>
                                <div className={'rounded-full shadow-lg shadow-gray-900 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                                    <Link href={'https://www.linkedin.com/in/vutlhari-chauke-17b961271/'}><AiFillLinkedin size={20} /></Link>
                                </div>
                                <div className={'rounded-full shadow-lg shadow-gray-900 p-3 cursor-pointer hover:scale-105 ease-in duration-75'}>
                                    <Link href={'https://github.com/Shalatiey23'}><AiFillGithub size={20}/></Link>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className={'col-span-3 w-full h-auto shadow-xl shadow-gray-900 rounded-xl lg:p-4'}>
                    <div className={'p-4'}>
                        <form>
                            <div className={'grid md:grid-col-4 w-full py-2'}>
                                <div className={'flex flex-col'}>
                                    <label className={'uppercase text-sm py-2'}>Name*</label>
                                    <input 
                                        className={'border-2 rounded-lg p-3 flex border-gray-300 text-[#000]'} 
                                        type='text' 
                                        placeholder='Enter your name'
                                        name='name'
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={'flex flex-col'}>
                                    <label className={'uppercase text-sm py-2'}>Email*</label>
                                    <input 
                                        className={'border-2 rounded-lg p-3 flex border-gray-300 text-[#000]'} 
                                        type='text' 
                                        placeholder='Enter your email'
                                        name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={'flex flex-col'}>
                                    <label className={'uppercase text-sm py-2'}>Subject*</label>
                                    <input 
                                        className={'border-2 rounded-lg p-3 flex border-gray-300 text-[#000]'} 
                                        type='text' 
                                        placeholder='Enter your subject'
                                        name='subject'
                                        value={values.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={'flex flex-col'}>
                                    <label className={'uppercase text-sm py-2'}>Message*</label>
                                    <textarea 
                                        className={'border-2 rounded-lg p-3 flex border-gray-300 text-[#000]'} 
                                        type='text' 
                                        placeholder='Message'
                                        name='message'
                                        value={values.message}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleSubmit} 
                                className={'mt-5 w-full p-4 text-gray-100'}
                                disabled={!values.name || !values.email || !values.subject || !values.message}
                            >
                                {isLoading === true ? <Loading /> : <p>Send Message</p>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact
