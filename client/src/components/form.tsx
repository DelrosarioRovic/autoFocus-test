import React, { useState, useEffect } from "react";
import axios from "axios";

const Form:React.FC = () => {
    const [serialNumberInput, setSerialNumberInput] = useState<string>('');
    const [skuNumberInput, setSkuNumberInput] = useState<string>('');

    const [isSerialNSuccessful, setIsSerialNSuccessful] = useState<boolean>(false);
    const [isSkuSuccessful, setIsSkuSuccessful] = useState<boolean>(false);

    const sendDataToAPiSerialN = async () => {
        setIsSerialNSuccessful(false)
        try {
            const response = await axios.post("http://localhost:3000/product/serial-number", {
                serialNumberInput:serialNumberInput
            })
            if (response.status === 200) {
                setIsSerialNSuccessful(true)
            }
            console.log(response)
        } catch (error) {
            console.log(error)
            setIsSerialNSuccessful(false)
        } 
    }

    const sendDataToAPiSku = async () => {
        setIsSkuSuccessful(false)
        try {
            const response = await axios.post("http://localhost:3000/product/sku", {
                sku:skuNumberInput
            })
            if (response.status === 200) {
                setIsSkuSuccessful(true)
            }
            console.log(response)
        } catch (error) {
            console.log(error)
            setIsSkuSuccessful(false)
        } 
    }

    //sku search bar
    useEffect(() => {
        if (skuNumberInput.trim() !== '') {
            sendDataToAPiSku()
        }
      }, [skuNumberInput]);
      //serial number search bar
      useEffect(() => {
        if (serialNumberInput.trim() !== '') {
            sendDataToAPiSerialN()
        }
      }, [serialNumberInput]);

      //auto focus if the req is successful in serial number
    useEffect (() => {
        if (isSerialNSuccessful) {
            const serialNumber: any = document.getElementById('sku');
            serialNumber.focus();
        }
    }, [isSerialNSuccessful])
    //auto focus if the req is successful in Sku
    useEffect (() => {
        if (isSkuSuccessful) {
            const skuNumber: any = document.getElementById('blank');
            skuNumber.focus();
        }
    }, [isSkuSuccessful])


    return (
        <div className="w-full h-[70vh] flex justify-center items-center">
            <form className="flex gap-x-5">
                <label htmlFor="">Serial Number:</label>
                <input type="text" className="outline-1 outline"
                    autoFocus
                    id="serial-number"
                    value={serialNumberInput}
                    onChange={(e)=> setSerialNumberInput(e.target.value)}
                />
                <label htmlFor="">SKU:</label>
                <input type="text" 
                    className="outline-1 outline"
                    id="sku"
                    autoFocus={isSerialNSuccessful}
                    value={skuNumberInput}
                    onChange={(e)=> setSkuNumberInput(e.target.value)}
                />
                <label htmlFor="">Blank</label>
                <input type="text" 
                    className="outline-1 outline"
                    id="blank"
                    autoFocus={isSkuSuccessful}
                    // value={skuNumberInput}
                    onChange={(e)=> setSkuNumberInput(e.target.value)}
                />
            </form>
        </div>
    )
}


export default Form;