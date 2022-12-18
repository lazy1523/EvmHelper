// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

/**
    * @title EvmHelper
    * @dev Helper contract for EVM
    一个服务于EVM开发者通过回答问题获取Goerli等测试币的合约
    流程如下：
    1、提问者提问，在合约中放置悬赏的GoerliETH数量，发布问题并保存到IPFS上。
    2、回答者在合约上回答问题
    3、提问者在合约中了结问题，提问者选择有帮助的回答者，回答者平分悬赏的GoerliETH
*/

contract EvmHelper is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private ISSUE_ID;
    address payable private owner;
    mapping(uint256 => IssueItem) private issueItems;


    // 问题结构体
    struct IssueItem {
        uint256 indexed ISSUE_ID,
        address payable issuer;
        address payable answerer;
        string title;
        string content;
        bool isSolved;
        uint256 reward;
        string jpgUrl;
    }

    // 创建提问时创建事件
    event IssueItemCreated(
        uint256 indexed ISSUE_ID,
        string title;
        string content;
        bool isSolved;
        uint256 reward;
        string jpgUrl;
        string ipfs_Reply;
    );


    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }


    // 创建问题，并注入悬赏的ETH
    function createIssue(string memory title, string memory content, string memory jpgUrl) public payable {
        require(msg.value > 0, "Reward must be greater than 0");
        ISSUE_ID.increment();
        issueItems[ISSUE_ID.current()] = IssueItem(
            ISSUE_ID.current(),
            title,
            content,
            false,
            msg.value,
            address(0),
            jpgUrl
        );
        emit IssueItemCreated(
            ISSUE_ID.current(),
            title,
            content,
            false,
            msg.value,
            jpgUrl
        );
    }

    // 返回当前问题列表
    function getIssueList() public view returns (IssueItem[] memory) {
        IssueItem[] memory issueList = new IssueItem[](ISSUE_ID.current());
        for (uint256 i = 0; i < ISSUE_ID.current(); i++) {
            issueList[i] = issueItems[i + 1];
        }
        return issueList;
    }

    // 提问者采纳答案，并将悬赏的ETH分给回答者
    function solveIssue(uint256 issueId, string memory ipfs_Reply) public payable {
        require(msg.sender == issueItems[issueId].issuer, "Only issuer can solve issue");
        require(issueItems[issueId].isSolved == false, "Issue has been solved");
        issueItems[issueId].isSolved = true;
        issueItems[issueId].answerer = payable(msg.sender);
        issueItems[issueId].ipfs_Reply = ipfs_Reply;
        uint256 reward = issueItems[issueId].reward;
        issueItems[issueId].answerer.transfer(reward);
    }
   
}
