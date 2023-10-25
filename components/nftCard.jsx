export const NFTCard = ({ nft }) => {
  return (
    <div className="flex flex-col w-[240px] h-[358.08px] mx-1 my-3 relative ">
      <div className=" h-[67%] flex relative">
        <img
          className="absolute top-0 object-cover w-full -z-10 rounded-t-[10px]"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col y-gap-2 h-[21%] bg-slate-100 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">
            Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <p className="text-gray-600">{`${nft.contract.address.substr(
            0,
            4
          )}...${nft.contract.address.substr(
            nft.contract.address.length - 4
          )}`}</p>
        </div>

        <div className="flex justify-center w-full h-[12%] bottom-0 absolute rounded-b-[10px]">
          <a
            target={'_blank'}
            href={`https://etherscan.io/token/${nft.contract.address}`}
            className="w-full px-4 py-2 text-center text-white bg-blue-500 cursor-pointer rounded-b-[10px]"
          >
            View on etherscan
          </a>
        </div>
      </div>
    </div>
  )
}
