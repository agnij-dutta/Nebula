import { ethers } from 'ethers';
import abi from '../artifacts/contracts/SignMessage.sol/SignMessage.json';

const contractAddress = '0xF854D2C4909316b32c7172A66855f420140Fb26c';

export async function signNebulaRegistration(signer) {
    try {
        const contract = new ethers.Contract(contractAddress, abi.abi, signer);
        const tx = await contract.signMessage("I hereby register for Nebula");
        await tx.wait();
        return true;
    } catch (error) {
        console.error('Contract signing error:', error);
        throw error;
    }
}