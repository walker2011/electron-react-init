import { Image } from 'antd';
import { useEffect, useState } from 'react';
import cv from '@epascal/opencv-ts';

export default function ImageComponent({ imageUrl }: { imageUrl: string }) {

    const [data, setData] = useState<string>("")
    const [isOpenCVInited, setIsOpenCVInited] = useState<boolean>(false)

    useEffect(()=>{
        cv.onRuntimeInitialized = ()=>{
            setIsOpenCVInited(true)
        }
    }, [setIsOpenCVInited])

    useEffect(()=>{
        if(isOpenCVInited && !!imageUrl) {
            // via Promise
            const mat = cv.imread('./path/img.jpg');
            setData(`data:image/jpeg;base64,${mat.data.toString()}`)
        } else {
            setData("")
        }
    }, [isOpenCVInited, imageUrl, setData])

    return (
        <Image src={data}>

        </Image>
    );
}
