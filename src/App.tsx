/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react'
import ProductCard from "./components/ProductCard"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import Modal from "./components/ui/Modal"
import { categories, colors, formInputsList, productList } from "./data"
import { ChangeEvent, FormEvent, useState } from 'react'
import { IProduct } from "./interfaces"
import { productValidation } from "./validation"
import ErrorMsg from "./components/ErrorMsg/ErrorMsg"
import CircleColor from "./components/CircleColor"
import Select from "./components/ui/Select"
import { v4 as uuid } from "uuid";
import { TProductName } from "./typs"
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  //-------- Stats ---------
  const [tempColor, setTempColor] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdite] = useState(false)
  const [isOpenRemove, setIsOpenRemove] = useState(false)
  const [products, setProducts] = useState<IProduct[]>(productList)
  const staticProduct = {
    title: "",
    description: "",
    img: "",
    price: "",
    colors: [],
    category: {
      name: "",
      img: ""
    }
  }
  const [product, setProduct] = useState<IProduct>(staticProduct)
  const [productEdit, setProductEdit] = useState<IProduct>(staticProduct)
  const [productEditIdx, setProductEditIdx] = useState<number>(0)
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    img: "",
    price: "",
    // color: [""],
  })
  const [selected, setSelected] = useState(categories[0]);


  //-------- Handlers ---------
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, } = e.target
    console.log(name)
    setProduct({
      ...product,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    })
  }

  const onChangeHandlerEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, } = e.target
    console.log(name)
    setProductEdit({
      ...productEdit,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    })
  }

  const handleCancel = () => {
    setIsOpen(false)
    setProduct(staticProduct)
  }
  
  const handleSubmet = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { title, description, img, price } = product
    const errors = productValidation({
      title,
      description,
      img,
      price,
      // color
    })

    const hasErrors = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    console.log(hasErrors)
    if (!hasErrors) {
      setErrors(errors)
      return
    }
    console.log("send data to server")
    setProducts(prev => [...prev, { ...product, id: uuid(), colors: tempColor, category: selected }])
    setProduct(staticProduct)
    setTempColor([])
    closeModal()
    toast("Product has been Added", {
      style: {
        backgroundColor: "black",
        color: "white"
      },
      icon: '👏',
    }
    )
  }

  const handleSubmetEdit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { title, description, img, price } = productEdit
    const errors = productValidation({
      title,
      description,
      img,
      price,
      // color
    })

    const hasErrors = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "")
    console.log(hasErrors)
    if (!hasErrors) {
      setErrors(errors)
      return
    }

    const updatedProducts = [...products]
    updatedProducts[productEditIdx] = {...productEdit, colors: tempColor.concat(productEdit.colors)}
    setProducts(updatedProducts)
    setProductEdit(staticProduct)
    setTempColor([])
    closeModalEdit()
    toast("Product has been Edited", {
      style: {
        backgroundColor: "black",
        color: "white"
      },
      icon: '👏',
    }
    )
  }

  const removeProductHandler = (): void => {
    const filtered = products.filter(product => product.id !== productEdit.id)
    setProducts(filtered)
    closeModalRemove()
    toast("Product has been deleted", {
      style: {
        backgroundColor: "black",
        color: "white"
      },
      icon: '👏',
    }
    )
  }

  //-------- Modal ---------
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const closeModalEdit = () => setIsOpenEdite(false)
  const openModalEdit = () => setIsOpenEdite(true)

  const closeModalRemove = () => setIsOpenRemove(false)
  const openModalRemove = () => setIsOpenRemove(true)

  //-------- Render ---------
  const renderInputList = formInputsList.map((input) => {
    return (
      <div className="flex flex-col" key={input.id}>
        <label htmlFor={input.id} className="mb-[2px] text-sm font-medium">{input.label}</label>
        <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} />
        <ErrorMsg msg={errors[input.name]} />

      </div>
    )
  })

  const renderList = products.map((product, idx) => <ProductCard key={product.id} product={product} setProductEdit={setProductEdit} openModalEdit={openModalEdit} setProductEditIdx={setProductEditIdx} idx={idx} openModalRemove= {openModalRemove}/>)
  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} onClick={() => {
    if (tempColor.includes(color)) {
      setTempColor(prev => prev.filter(item => item !== color))
      return
    }
    if (productEdit.colors.includes(color)) {
      setTempColor(prev => prev.filter(item => item !== color))
      return
    }
    setTempColor((prev) => [...prev, color])
    console.log(tempColor);
    // staticProduct.colors.push(tempColor)
  }} />)

  const renderEditInput = (id: string, label: string, name: TProductName,) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium">{label}</label>
        <Input type={"text"} name={name} id={id} value={productEdit[name]} onChange={onChangeHandlerEdit} />
        <ErrorMsg msg={errors[name]} />
      </div>
    )
  }

  return (
    <main className="container">
      <div className="flex justify-between items-center w-full mt-5">
        <h1 className="font-bold text-[40px]">ADD NEW <span className="text-indigo-600">PRODUCT ={'>'}</span></h1>
      <Button className="w-[300px] bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-[20px] p-3 rounded-[10px]"
        onClick={openModal}
      >
        ADD PRODUCT
      </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {renderList}
      </div>
      {/* Add Model */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form onSubmit={handleSubmet} className="space-y-3">
          {renderInputList}
          <Select selected={selected} setSelected={setSelected} />
          <div className="flex space-x-2 my-4">
            {tempColor.map(color => (
              <span className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{ background: color }} key={color}>{color}</span>
            ))}
            {/* <ErrorMsg msg={errors.color.length > 0 ? errors.color[0] : ""} /> */}
          </div>
          <div className="flex space-x-2 my-4">
            {renderProductColors}
          </div>

          <div className="flex items-center space-x-3 ">
            <Button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-[20px] p-3 rounded-[10px]">Submet</Button>
            <Button onClick={handleCancel} className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold text-[20px] p-3 rounded-[10px]">Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Model */}
      <Modal isOpen={isOpenEdit} closeModal={closeModalEdit} title="EDIT THIS PRODUCT">
        <form onSubmit={handleSubmetEdit} className="space-y-3">
          {renderEditInput("Title", "Product Title", "title")}
          {renderEditInput("Description", "Product Description", "description")}
          {renderEditInput("Image", "Product Image", "img")}
          {renderEditInput("Image", "Product Image", "img")}
          {renderEditInput("Price", "Product Price", "price")}


          <Select selected={productEdit.category} setSelected={value => setProductEdit({...productEdit, category: value})} />
          <div className="flex flex-wrap space-x-2 my-4">
            {tempColor.concat(productEdit.colors).map(color => (
              <span className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{ background: color }} key={color}>{color}</span>
            ))}
          </div>
          <div className="flex space-x-2 my-4">
            {renderProductColors}
          </div>

          <div className="flex items-center space-x-3 ">
            <Button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-[20px] p-3 rounded-[10px]">Submet</Button>
            <Button onClick={handleCancel} className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold text-[20px] p-3 rounded-[10px]">Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Remove Model */}
      <Modal 
      isOpen={isOpenRemove} 
      closeModal={closeModalRemove} 
      title="Are you sure you want to remove this Product from your Store ?"
      description="Deleting this product will remove it permanently form your inventory, Any associated data, sales history, and other related information will also be deleted, Please make sure you want to."
      >
          <div className="flex items-center space-x-3 ">
            <Button onClick={removeProductHandler} className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-[20px] p-3 rounded-[10px]">Remove</Button>
            <Button onClick={closeModalRemove} className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold text-[20px] p-3 rounded-[10px]">Cancel</Button>
          </div>
      </Modal>
      <Toaster />
    </main>
  )
}

export default App
