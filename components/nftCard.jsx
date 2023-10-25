export const NFTCard = ({ nft }) => {
  return (
    <div className="flex flex-col w-[250px] h-[373px] border-4 border-white relative">
      <div className=" h-[67%] flex justify-center items-center">
        <img
          className="object-contain h-full"
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

        <div className="flex justify-center w-full h-[12%] bottom-0 absolute">
          <a
            target={'_blank'}
            href={`https://etherscan.io/token/${nft.contract.address}`}
            className="w-full px-4 py-2 text-center text-white bg-blue-500 cursor-pointer rounded-m"
          >
            View on etherscan
          </a>
        </div>
      </div>
    </div>
  )
}
