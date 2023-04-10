// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract CrowdFunding is ContractMetadata{

    //定义活动的结构体
    struct Campaign {
        address owner; // 活动发起人的地址
        string title;  // 活动标题
        string description; //活动的表述
        uint256 target; //活动的目标金额
        uint256 deadline; //活动的截止日期
        uint256 amountCollected; //获得的金额
        string image; //封面
        address[] donators; //捐赠者的集合
        uint256[] donations; //捐赠金额的集合
    }

    //数字映射到活动
    mapping(uint256 => Campaign) public campaigns;

    //活动的序号，默认为0
    uint256 public numberOfCampaigns = 0;

     address public deployer;

    constructor() {
        deployer = msg.sender;
    }

     function _canSetContractURI() internal view virtual override returns (bool){
        return msg.sender == deployer;
    }


    //创建活动
    function createCampaign(
        address _owner, 
        string memory _title, 
        string memory _description, 
        uint256 _target, 
        uint256 _deadline, 
        string memory _image
        ) public returns(uint256){
           //实例化结构体
           Campaign storage campaign = campaigns[numberOfCampaigns];
           //检查截止日期是否大于当前日期
           require(campaign.deadline < block.timestamp, "The deadline should be a dete in th efuture");

           campaign.owner = _owner;
           campaign.title = _title;
           campaign.description = _description;
           campaign.target = _target;
           campaign.deadline = _deadline;
           campaign.amountCollected = 0;
           campaign.image = _image;
           
           //活动数量+1
           numberOfCampaigns ++;
           
           //返回此活动
           return numberOfCampaigns - 1;
        }

    //向活动捐款
    function donateToCampaign(uint256 _id) public payable {
        //金额等于捐款人的金额
        uint256 amount = msg.value;
        
        Campaign storage campaign = campaigns[_id];
        
        //捐款地址加入到捐款人的集合
        campaign.donators.push(msg.sender);
        //捐款金额加入到捐款金额的集合
        campaign.donations.push(amount);
        
        //把金额转移到活动拥有者
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            //如果成功，把捐款总额加上捐款金额
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }
    
    //查询捐款人的地址和金额
    function getDonators(uint256 _id) public view returns(address[] memory, uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    //查询活动
    function getCampaigns() public view returns(Campaign[] memory){
        //初始化活动合集
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        
        //遍历全部活动
        for(uint i = 0; i < numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        
        return allCampaigns;
    }
}