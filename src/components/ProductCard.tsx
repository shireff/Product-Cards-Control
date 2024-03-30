import Button from "./ui/Button";
import Img from "./Img";
import { IProduct } from "../interfaces";
import { descCut, priceCur, titlecCut } from "../utils/functions";
import CircleColor from "./CircleColor";

interface Iprops {
  product: IProduct,
  setProductEdit: (product : IProduct) => void
  openModalEdit: () => void
  openModalRemove: () => void
  idx: number
  setProductEditIdx: (value: number)=> void
}

const ProductCard = ({ product, setProductEdit, openModalEdit, idx, setProductEditIdx, openModalRemove }: Iprops) => {
  const { colors } = product
  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} onClick={() => { }} />)

  const Edit = () => {
    setProductEdit(product)
    openModalEdit()
    setProductEditIdx(idx)
    console.log(idx);
    
  }

  const Delete = () => {
    openModalRemove()
    setProductEdit(product)
  }

  return (
    <div className="mt-10 rounded-md p-2 border border-gray-400">
      <Img
        className="w-full h-52 rounded-[5px] lg:object-cover"
        src={product.img}
        alt={product.category.name}
      />
      <h3 className="mt-4 text-[28px] font-bold">
        {titlecCut(product.title)}
      </h3>
      <p className="mt-3 text-[20px] font-bold">
        {descCut(product.description)}
      </p>
      <div className="flex flex-wrap items-center gap-2 my-4">
        {/* {renderProductColors} */}
        {!colors.length ? <p>No Colors Available</p> : renderProductColors}
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[20px]">${priceCur(product.price)}</h1>
        <div className="flex items-center gap-2">
          <h6 className="font-semibold text-[15px]">{product.category.name}</h6>
          <Img
            className="rounded-full w-[50px] h-[50px]"
            alt={product.category.name}
            src={product.category.img}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 my-3">
        <Button onClick={Edit} className="w-full bg-indigo-700 text-white font-bold text-[20px] p-4 rounded-[10px]">
          Edit
        </Button>
        <Button className="w-full bg-red-700 text-white font-bold text-[20px] p-4 rounded-[10px]" onClick={Delete} >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
// function openModalEdit(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }

