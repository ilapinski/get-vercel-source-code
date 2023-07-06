import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { AddMediaImage, ArrowDown, ArrowUp, Code, Menu, OpenSelectHandGesture, Reduce, SaveActionFloppy, Text, Trash } from 'iconoir-react';

export default  function Home() {
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');
    const [HtmlTemplate, setHtmlTemplate] = useState<string>('');
    const [elements, setElements] = useState<any[]>([]);

    useEffect(() => {
        generateHTML();
    }, [elements]);

    const closeModal = () => {
        setShowModal(false);
    }

    const openModal = (type: string) => {
        setShowModal(true);
        setModalType(type);
    }

    const addToElements = (type: string) => {
        switch (type) {
            case 'TITLE':
                const title = (document.getElementById('titleInput') as HTMLTextAreaElement).value;
                const elementTitle: ElementTitle = {
                    type: 'title',
                    text: title
                };
                setElements([...elements, elementTitle]);
                break;
            case 'TEXT':
                const text = (document.getElementById('paragraphInput') as HTMLTextAreaElement).value;
                const elementText: ElementParagraph = {
                    type: 'paragraph',
                    text
                };
                setElements([...elements, elementText]);
                break;
            case 'BUTTON':
                const buttonText = (document.getElementById('buttonTextInput') as HTMLTextAreaElement).value;
                const buttonLink = (document.getElementById('buttonURLInput') as HTMLTextAreaElement).value;
                const buttonAlt = (document.getElementById('buttonAltInput') as HTMLTextAreaElement).value;
                const elementButton: ElementButton = {
                    type: 'button',
                    text: buttonText,
                    link: buttonLink,
                    alt: buttonAlt
                };
                setElements([...elements, elementButton]);
                break;
            case 'IMAGE':
                const src = (document.getElementById('imageUrlInput') as HTMLTextAreaElement).value;
                const alt = (document.getElementById('imageAltInput') as HTMLTextAreaElement).value;
                const link = (document.getElementById('imageLinkInput') as HTMLTextAreaElement).value;

                const elementImage: ElementImage = {
                    type: 'image',
                    src,
                    alt,
                    link
                };
                setElements([...elements, elementImage]);
                break;
            default:
                break;
        }
        closeModal();
        console.log(elements);
    }

    const deleteElement = (index: number) => {
        const newElements = elements.filter((element, i) => i !== index);
        setElements(newElements);
    }

    const moveElement = (index: number, direction: string) => {
        const newElements = [...elements];
        const element = newElements[index];
        newElements.splice(index, 1);
        if (direction === 'UP') {
            newElements.splice(index - 1, 0, element);
        } else {
            newElements.splice(index + 1, 0, element);
        }
        setElements(newElements);
    }

    const generateHTML = () => {
        let html = ``;
        html += FixedTemplateElements.header;
        elements.forEach((element) => {
            switch (element.type) {
                case 'title':
                    const isNextElementText = elements[elements.indexOf(element) + 1]?.type === ('paragraph' || 'title');
                    html += `<div style="background-color: #F5F5F5;
                                padding: ${isNextElementText ? '30px 30px 0 30px' : '30px'};
                                letter-spacing: 0.005em;
                                color: #000;
                                margin: 0;">`;
                    html += `<h1 style="font-family: 'Roboto', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                font-weight: 500;
                                font-size: 24px;
                                line-height: 28px;
                                letter-spacing: 0.005em;
                                color: #000;
                                margin: 0;">
                                ${(element as ElementTitle).text}
                            </h1>`;
                    html += `</div>`;
                    break;
                case 'paragraph':
                    const isNextElementText2 = elements[elements.indexOf(element) + 1]?.type === ('paragraph' || 'title');
                    html += `<p style="background-color: #F5F5F5;
                                padding: ${isNextElementText2 ? '30px 30px 0 30px' : '30px'};
                                font-family: 'Roboto', Arial, Helvetica, sans-serif;
                                font-style: normal;
                                font-weight: 400;
                                font-size: 15px;
                                line-height: 23px;
                                text-align: justify;
                                letter-spacing: 0.005em;
                                color: #000;
                                margin: 0;">
                                ${(element as ElementParagraph).text}
                            </p>`;
                    break;
                case 'button':
                    html += `<div style="background-color: #F5F5F5;
                            padding: 30px;
                            letter-spacing: 0.005em;
                            color: #000;
                            margin: 0;">`;
                    html += `<a href="${(element as ElementButton).link}" alt="${(element as ElementButton).alt}" target="_blank" style="text-decoration: none; color: #000; outline: none;">
                                <div style="display: block;
                                    background-color: #FFFF04 !important;
                                    border: none;
                                    color: black !important;
                                    padding: 15px 32px;
                                    text-align: center;
                                    text-decoration: none;
                                    font-size: 15px;
                                    margin: 15px auto !important;
                                    cursor: pointer;
                                    border-radius: 10px;
                                    margin: auto;
                                    font-weight: 600;
                                    max-width: 300px;">
                                    ${(element as ElementButton).text}
                                </div>
                            </a>`;
                    html += `</div>`;
                    break;
                case 'image':
                    if((element as ElementImage).link) {
                        html += `<a href="${(element as ElementImage).link}" target="_blank" style="display: block; margin-bottom: -2px;">`;
                    }
                    html += `<img src="${(element as ElementImage).src}" 
                                    alt="${(element as ElementImage).alt}"
                                    style="background-color: #F5F5F5 !important;
                                    margin: auto;
                                    width: 100%;
                                    height: auto;
                                    object-fit: contain;
                                    display: block;"/>`;
                    if((element as ElementImage).link) {
                        html += `</a>`;
                    }
                    break;
                default:
                    break;
            }
        });

        html += FixedTemplateElements.footer;
        
        setHtmlTemplate(html);
    }
    

    return (
    <>
        <Head>
            <title>Prematch - Content Library</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className='relative'>
            {/* OVERLAY */}
            {showModal && (
                <>
                    <div className='absolute w-full h-full top-0 left-0  bg-zinc-950 opacity-90' onClick={closeModal}></div>

                    {/* MODAL */}
                    <div className='absolute w-1/2 h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-950 rounded-lg max-md:w-full max-md:h-full'>
                    {
                        modalType === 'TEXT' && (
                            <>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <p className='text-2xl font-bold text-zinc-50'>Text hinzufügen</p>
                                    <button className='text-zinc-50' onClick={() => setShowModal(false)}>
                                        <Reduce color='text-zinc-50' height={28} width={28} />
                                    </button>
                                </div>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <div className='flex flex-col w-full'>
                                        <p className='text-zinc-50 leading-8 mb-2'>Hier kanns du einen Text-Paragraphen hinzufügen. Du kannst auch Liquid Tags hinzufügen (z.B. <span className='p-2 bg-zinc-700 rounded-lg font-mono text-zinc-300 '> &#123;&#123; Profile.name | default: "Du" &#125;&#125;</span>). </p>
                                        <textarea className='bg-zinc-800 rounded-lg p-2 mt-2 w-full max-h-full' id="paragraphInput"/>
                                        <button onClick={() => addToElements('TEXT')} className="mt-4 px-4 py-2 border rounded-lg text-zinc-950 font-semibold bg-[#FFFF04] border-transparent hover:bg-[#D9D900] hover:transition-all focus:bg-yellow-400  focus:outline-none focus:ring-2 focus:ring-[#FFFF04] focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center justify-center">
                                            <SaveActionFloppy color="black" height={28} width={28} className='mr-2'/>
                                            Speichern
                                    </button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        modalType === 'TITLE' && (
                            <>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <p className='text-2xl font-bold text-zinc-50'>Titel hinzufügen</p>
                                    <button className='text-zinc-50' onClick={() => setShowModal(false)}>
                                        <Reduce color='text-zinc-50' height={28} width={28} />
                                    </button>
                                </div>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <div className='flex flex-col w-full'>
                                        <p className='text-zinc-50 leading-8 mb-2'>Hier kanns du einen Titel hinzufügen. Du kannst auch Liquid Tags hinzufügen (z.B. <span className='p-2 bg-zinc-700 rounded-lg font-mono text-zinc-300 '> &#123;&#123; Profile.name | default: "Du" &#125;&#125;</span>). </p>
                                        <input className='bg-zinc-900 rounded-lg p-2 mt-2 w-full max-h-full' placeholder='Titel' id="titleInput"/>
                                        <button onClick={() => addToElements('TITLE')} className="mt-4 px-4 py-2 border rounded-lg text-zinc-950 font-semibold bg-[#FFFF04] border-transparent hover:bg-[#D9D900] hover:transition-all focus:bg-yellow-400  focus:outline-none focus:ring-2 focus:ring-[#FFFF04] focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center justify-center">
                                            <SaveActionFloppy color="black" height={28} width={28} className='mr-2'/>
                                            Speichern
                                    </button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        modalType === 'BUTTON' && (
                            <>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <p className='text-2xl font-bold text-zinc-50'>Button hinzufügen</p>
                                    <button className='text-zinc-50' onClick={() => setShowModal(false)}>
                                        <Reduce color='text-zinc-50' height={28} width={28} />
                                    </button>
                                </div>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <div className='flex flex-col w-full'>
                                        <p className='text-zinc-50 leading-8 mb-2'>Hier kanns du einen Button mit Link hinzufügen. </p>
                                        <input className='bg-zinc-900 rounded-lg p-2 mt-2 w-full max-h-full' placeholder='Text' id="buttonTextInput"/>
                                        <input className='bg-zinc-900 rounded-lg p-2 mt-2 w-full max-h-full' placeholder='URL' id="buttonURLInput"/>
                                        <input className='bg-zinc-900 rounded-lg p-2 mt-2 w-full max-h-full' placeholder='Kurze Beschreibung' id="buttonAltInput"/>
                                        <button onClick={() => addToElements('BUTTON')} className="mt-4 px-4 py-2 border rounded-lg text-zinc-950 font-semibold bg-[#FFFF04] border-transparent hover:bg-[#D9D900] hover:transition-all focus:bg-yellow-400  focus:outline-none focus:ring-2 focus:ring-[#FFFF04] focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center justify-center">
                                            <SaveActionFloppy color="black" height={28} width={28} className='mr-2'/>
                                            Speichern
                                    </button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        modalType === 'PICTURE' && (
                            <>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <p className='text-2xl font-bold text-zinc-50'>Bild hinzufügen</p>
                                    <button className='text-zinc-50' onClick={() => setShowModal(false)}>
                                        <Reduce color='text-zinc-50' height={28} width={28} />
                                    </button>
                                </div>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <div className='flex flex-col w-full'>
                                        <p className='text-zinc-50 leading-8 mb-2'>Hier kanns du ein Bild (z.B. ). Du kannst auch Liquid Tags hinzufügen (z.B. <span className='p-2 bg-zinc-700 rounded-lg font-mono text-zinc-300 '> &#123;&#123; Profile.name | default: "Du" &#125;&#125;</span>). </p>
                                        <input className='bg-zinc-900 rounded-lg p-2 mt-2 w-full max-h-full' placeholder='URL' id="imageUrlInput"/>
                                        <input className='bg-zinc-900 rounded-lg p-2 mt-2 w-full max-h-full' placeholder='Kurze Beschreibung' id="imageAltInput"/>
                                        <input className='bg-zinc-900 rounded-lg p-2 mt-2 w-full max-h-full' placeholder='Klickbarer Link URL (optional)' id="imageLinkInput"/>
                                        
                                        <button onClick={() => addToElements('IMAGE')} className="mt-4 px-4 py-2 border rounded-lg text-zinc-950 font-semibold bg-[#FFFF04] border-transparent hover:bg-[#D9D900] hover:transition-all focus:bg-yellow-400  focus:outline-none focus:ring-2 focus:ring-[#FFFF04] focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center justify-center">
                                            <SaveActionFloppy color="black" height={28} width={28} className='mr-2'/>
                                            Speichern
                                    </button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        modalType === 'ELEMENTS' && (
                            <>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <p className='text-2xl font-bold text-zinc-50'>Elemente</p>
                                    <button className='text-zinc-50' onClick={() => setShowModal(false)}>
                                        <Reduce color='text-zinc-50' height={28} width={28} />
                                    </button>
                                </div>
                                {
                                    elements.map((element, index) => {
                                        return (
                                            <div className='rounded-md h-fit bg-zinc-900 m-4 p-5 flex justify-between'>
                                                { (element.type === 'paragraph' || element.type === 'title') && (
                                                    <p className='text-zinc-50 truncate'>{element.text}</p>
                                                )}
                                                { element.type === 'image' && (
                                                    <div className='flex flex-row'>
                                                        <img src={element.src} alt={element.alt} className='w-20 h-7 object-cover' />
                                                        <span className='ml-3'>
                                                            {element.alt}
                                                        </span>
                                                    </div>
                                                )}
                                            
                                                <div className='flex flex-row'>
                                                    <div onClick={() => moveElement(index, 'UP')} className='bg-zinc-700 p-1 rounded-lg hover:bg-zinc-600 cursor-pointer transition-all'>
                                                        <ArrowUp color='white' height={24} width={24} />
                                                    </div>
                                                    <div onClick={() => moveElement(index, 'DOWN')} className='bg-zinc-700 p-1 rounded-lg ml-1 hover:bg-zinc-600 cursor-pointer transition-all'>
                                                        <ArrowDown color='white' height={24} width={24} />
                                                    </div>
                                                    <div onClick={() => deleteElement(index)} className='bg-zinc-700 p-1 rounded-lg ml-1 hover:bg-red-700 cursor-pointer transition-all'>
                                                        <Trash color='white' height={24} width={24} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
}
                            </>
                        )
                    }
                    {
                        modalType === 'HTML_TEMPLATE' && (
                            <>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <p className='text-2xl font-bold text-zinc-50'>Code</p>
                                    <button className='text-zinc-50' onClick={() => setShowModal(false)}>
                                        <Reduce color='text-zinc-50' height={28} width={28} />
                                    </button>
                                </div>
                                <div className='flex flex-row justify-between items-center p-4'>
                                    <div className='flex flex-col w-full'>
                                        <p className='text-zinc-50 leading-8 mb-2'>Diesen Code kannst du kopieren und bei CleverTap einfügen.</p>
                                        <textarea className='bg-zinc-800 rounded-lg p-2 mt-2 w-full min-h-[400px] max-h-full'>
                                            { HtmlTemplate }
                                        </textarea>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    </div>
                </>
            )}

            <Header />
            <header className="bg-zinc-700 shadow">
                <div className="mx-auto max-w-4xl py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Template hinzufügen</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0 bg-zinc-900 rounded-lg max-md:rounded-none">
                        <div className="mt-1 px-4">
                            <div className='block ml-auto mr-0 w-fit'>
                                <div className='flex flex-row'>
                                    <button onClick={() => openModal('HTML_TEMPLATE')} className="mt-4 px-4 py-2 border rounded-lg text-purple-50 font-semibold bg-purple-700 border-transparent hover:bg-purple-600 hover:transition-all focus:bg-purple-500  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center">
                                        <Code color="text-purple-50" height={28} width={28} className='mr-2'/>
                                        Code kopieren
                                    </button>
                                    <button className="mt-4 ml-2 px-4 py-2 border rounded-lg text-zinc-950 font-semibold bg-[#FFFF04] border-transparent hover:bg-[#D9D900] hover:transition-all focus:bg-yellow-400  focus:outline-none focus:ring-2 focus:ring-[#FFFF04] focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center">
                                        <SaveActionFloppy color="black" height={28} width={28} className='mr-2'/>
                                        Speichern
                                    </button>
                                </div>
                            </div>

                            <div className="px-4 py-6 sm:px-0 bg-zinc-800 rounded-lg max-md:rounded-none mt-4">
                                <div className='flex flex-row justify-center'>
                                    <button onClick={() => openModal('TITLE')} className="px-4 py-2 border rounded-lg text-purple-50 font-semibold bg-zinc-700 border-transparent hover:bg-zinc-600 hover:transition-all focus:bg-zinc-500  focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center">
                                        <Text color="text-purple-50" height={28} width={28} className='mr-2'/>
                                        Titel
                                    </button>
                                    <button onClick={() => openModal('TEXT')} className="px-4 py-2 ml-2 border rounded-lg text-purple-50 font-semibold bg-zinc-700 border-transparent hover:bg-zinc-600 hover:transition-all focus:bg-zinc-500  focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center">
                                        <Text color="text-purple-50" height={28} width={28} className='mr-2'/>
                                        Text
                                    </button>
                                    <button onClick={() => openModal('BUTTON')} className="px-4 py-2 ml-2 border rounded-lg text-purple-50 font-semibold bg-zinc-700 border-transparent hover:bg-zinc-600 hover:transition-all focus:bg-zinc-500  focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center">
                                        <OpenSelectHandGesture color="text-purple-50" height={28} width={28} className='mr-2'/>
                                        Button
                                    </button>
                                    <button onClick={() => openModal('PICTURE')} className="ml-2 px-4 py-2 border rounded-lg text-purple-50 font-semibold bg-zinc-700 border-transparent hover:bg-zinc-600 hover:transition-all focus:bg-zinc-500  focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center">
                                        <AddMediaImage color="text-purple-50" height={28} width={28} className='mr-2'/>
                                        Bild
                                    </button>
                                    <button onClick={() => openModal('ELEMENTS')} className="ml-2 px-4 py-2 border rounded-lg text-purple-50 font-semibold bg-zinc-700 border-transparent hover:bg-zinc-600 hover:transition-all focus:bg-zinc-500  focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent max-md:w-full max-md:mr-0 flex flex-row items-center">
                                        <Menu color="text-purple-50" height={28} width={28} className='mr-2'/>
                                        Elemente
                                    </button>
                                </div>
                            </div>
                            <iframe srcDoc={HtmlTemplate} title="output" className='w-full h-[600px] rounded-lg max-md:rounded-none mt-4' />    
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </>
    )
}


interface ElementTitle {
    type: 'title'
    text: string
}

interface ElementParagraph {
    type: 'paragraph'
    text: string
}

interface ElementImage {
    type: 'image'
    src: string,
    alt: string,
    link: string
}

interface ElementButton {
    type: 'button',
    text: string,
    link: string,
    alt: string
}

enum FixedTemplateElements {
    header = `<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Anton:wght@300;400;500&display=swap" rel="stylesheet">
        </head>
<body style="font-family: Roboto, Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #000;
            background-color: #fff;
            width: 100%;">
    <div style="display: block;
            margin: auto;
            width: 100%;
            max-width: 650px;">
    <img src="https://res.cloudinary.com/dcsj8cbaz/image/upload/v1687163791/Email%20Campaign%20Assets/header-new_phirlb.png" alt="banner"
            style="margin-bottom: -5px;
            width: 100%;
            height: auto;
            display: block;
            object-fit: contain;"/>`,
    footer = ` <div style="margin: 20px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 30px;">
            <div class="left">
            <!-- Instagram -->
            <a href="https://www.instagram.com/prematch/?hl=en" target="_blank"
            style="text-decoration: none;
            color: #000;
            outline: none;">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5002 16.6667C13.6052 16.6667 14.665 16.2277 15.4464 15.4463C16.2278 14.6649 16.6668 13.6051 16.6668 12.5C16.6668 11.3949 16.2278 10.3351 15.4464 9.55373C14.665 8.77233 13.6052 8.33334 12.5002 8.33334C11.3951 8.33334 10.3353 8.77233 9.55388 9.55373C8.77248 10.3351 8.3335 11.3949 8.3335 12.5C8.3335 13.6051 8.77248 14.6649 9.55388 15.4463C10.3353 16.2277 11.3951 16.6667 12.5002 16.6667Z" stroke="black" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.125 16.6667V8.33333C3.125 6.952 3.67373 5.62724 4.65049 4.65049C5.62724 3.67373 6.952 3.125 8.33333 3.125H16.6667C18.048 3.125 19.3728 3.67373 20.3495 4.65049C21.3263 5.62724 21.875 6.952 21.875 8.33333V16.6667C21.875 18.048 21.3263 19.3728 20.3495 20.3495C19.3728 21.3263 18.048 21.875 16.6667 21.875H8.33333C6.952 21.875 5.62724 21.3263 4.65049 20.3495C3.67373 19.3728 3.125 18.048 3.125 16.6667Z" stroke="black" stroke-width="1.5625"/>
                    <path d="M18.229 6.78081L18.239 6.76981" stroke="black" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>

            <!-- TikTok -->
            <a href="https://www.tiktok.com/@prematchapp" target="_blank"
            style="text-decoration: none;
            color: #000;
            outline: none;">
                <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.0645 8.33333V16.6667C22.0645 18.048 21.5139 19.3728 20.5339 20.3495C19.5539 21.3263 18.2247 21.875 16.8388 21.875H8.47765C7.09171 21.875 5.76253 21.3263 4.78252 20.3495C3.80252 19.3728 3.25195 18.048 3.25195 16.6667V8.33333C3.25195 6.952 3.80252 5.62724 4.78252 4.65049C5.76253 3.67373 7.09171 3.125 8.47765 3.125H16.8388C18.2247 3.125 19.5539 3.67373 20.5339 4.65049C21.5139 5.62724 22.0645 6.952 22.0645 8.33333Z" stroke="black" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.568 12.5C9.94791 12.5 9.34171 12.6833 8.82609 13.0267C8.31047 13.37 7.9086 13.8581 7.67129 14.4291C7.43398 15.0001 7.37188 15.6285 7.49286 16.2347C7.61385 16.8408 7.91246 17.3977 8.35096 17.8347C8.78946 18.2717 9.34813 18.5694 9.95635 18.69C10.5646 18.8105 11.195 18.7486 11.7679 18.5121C12.3408 18.2756 12.8305 17.8751 13.175 17.3612C13.5196 16.8473 13.7035 16.2431 13.7035 15.625V6.25C14.0515 7.29167 15.3757 9.375 17.884 9.375" stroke="black" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            </div>

            <div class="right">
            <!-- AppStore -->
            <a href="https://prematch.onelink.me/wEIO/rn7yxnf6" target="_blank" 
            style="text-decoration: none;
            color: #000;
            outline: none;">
                <img src="https://res.cloudinary.com/dcsj8cbaz/image/upload/v1686814431/Email%20Campaign%20Assets/1_xqT83bMEz92IBYxS9UQNow_Small_jijcvp.jpg" alt="AppStore" style="max-width: 70px">
            </a>

            <!-- GooglePlay -->
            <a href="https://prematch.onelink.me/wEIO/rn7yxnf6" target="_blank"
            style="text-decoration: none;
            color: #000;
            outline: none;">
                <img src="https://res.cloudinary.com/dcsj8cbaz/image/upload/v1686814430/Email%20Campaign%20Assets/1_nZu0dsnlCQltPT1QMCHFAA_Small_euc5kt.jpg" alt="GooglePlay" style="max-width: 70px"/>
            </a>
            </div>

            </div>
            <p style="font-family: 'Roboto', Arial, Helvetica, sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 15px;
            text-align: justify;
            letter-spacing: 0.005em;

            padding: 0 30px;
            color: #666666;">
            PREMATCH Sports GmbH<br/>
            Rathenauplatz 9<br/>
            50674 Köln
            </p>
            </div>
            </body>
            </html>`
}