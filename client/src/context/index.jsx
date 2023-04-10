//与合约交互的逻辑
import React,{useContext, createContext} from "react";
import { useAddress, useContract, useMetamask, useContractWrite, useMetadata } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";


const StateContext = createContext();


//获取合约
export const StateContextProvider = ({ children }) => {
    //获取合约
    const { contract } = useContract("0x791271CE2401970cdAd8A386930657552dc6a7Bd")
    // const { data } = useMetadata(contract);
    // console.log(data);
    // console.log(contract);
    // const { contract } = useContract(contractAddress);
    //连接合约的创建活动函数
    const { mutateAsync: createCampaign } = useContractWrite(contract,"createCampaign");
    
    //获取地址
    const address = useAddress();
    //连接钱包
    const connect = useMetamask();
    
    //连接合约中的活动
   const publishCampaign = async ( form ) => {
   
    try {
        // console.log((form.target));
        // console.log(new Date(form.deadline).getTime());
        console.log( (form.target).toString());
        //添加args:[]
        const data = await createCampaign({
            args:[
            address, //owner
            form.title, //title
            form.description, //description
            (form.target).toString(), 
            new Date(form.deadline).getTime(), //deadline
            form.image 

        ]});

      console.log("contract call success",data);   
    } catch (error) {
        console.error("contract call failure",error);
    }
   }
 
    //获取合约中的getCampaigns函数
    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaings = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toString(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))

        // console.log(parsedCampaings);
        return parsedCampaings;
    }
    
    //获取自己钱包创建的活动
    const getUserCampaigns = async() => {
         const allCampaign = await getCampaigns();
         
         //对比创建活动的地址就是自己的地址
         const fillteredCampaigns = allCampaign.filter((campaign) => campaign.owner ===address);

         return fillteredCampaigns;
    }
   

    //获取合约中捐款函数进行捐款
     const donate = async (pId, amount) => {
        //调用合约的donateToCampaign函数，进行捐款
        const data = await contract.call('donateToCampaign', [pId], {value: ethers.utils.parseEther(amount)});

        return data
     }

    //获取合约中的捐款的总数
      const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;
        console.log(numberOfDonations);

        const parseDonations = [];

        //遍历捐款者和捐款金额
        for(let i = 0; i < numberOfDonations; i++ ){
            parseDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parseDonations;
      }

    return (
        <StateContext.Provider
           value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaigns,
            donate,
            getDonations
           }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);