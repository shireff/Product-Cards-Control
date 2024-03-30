interface Iprops {
 src: string,
 alt: string,
 className?: string
}

const Img = ({src, alt,className} : Iprops) => {
    return (
        <img
          className={className}
          src={src}
          alt={alt}
        />
    )
}

export default Img