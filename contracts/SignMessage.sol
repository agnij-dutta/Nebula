// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SignMessage {
    event MessageSigned(address indexed signer, string message, uint256 timestamp);
    
    // Keep track of who has signed
    mapping(address => bool) public hasSigned;
    mapping(address => string) public signatures;
    
    function signMessage(string memory message) external {
        require(!hasSigned[msg.sender], "Already signed");
        require(keccak256(bytes(message)) == keccak256(bytes("I hereby register for Nebula")), "Invalid message");
        
        hasSigned[msg.sender] = true;
        signatures[msg.sender] = message;
        
        emit MessageSigned(msg.sender, message, block.timestamp);
    }
    
    function verifySignature(address signer) external view returns (bool, string memory) {
        return (hasSigned[signer], signatures[signer]);
    }
}