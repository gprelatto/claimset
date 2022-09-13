import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Packs } from "../../interfaces/packs";
import { MediaRenderer, useAddress, useMetamask, useSDK, useSigner } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Admin: NextPage = () => {
    const address = useAddress();
    const signer = useSigner();
    const connectWithMetamask = useMetamask();

    const setClaims = async () => {
        const sdk = ThirdwebSDK.fromSigner(signer!, "mumbai");
        const nftEdition = await sdk!.getEditionDrop('0xF17939DfC755eb062Fd35990976c6985Cf85d3fc');
        const res = await nftEdition.getTotalCount()
        const totalClaims = Number(ethers.utils.formatUnits(res.toString(), 0))
        const presaleStartTime = new Date();
        const claimConditions = [
            {
                startTime: presaleStartTime, // start the presale now
                price: 0, // presale price
                snapshot: ['0x5e1A7565Ef77176B5335AC3d00A3773b3bB23c94'], // limit minting to only certain addresses
            }
        ];
        let conditionsBatch = []
        for (let i = 0; i < totalClaims; i++) {
            conditionsBatch.push(
                {
                    tokenId: i,
                    claimConditions: claimConditions
                }
            )
        }
        console.log('start set claims for:', conditionsBatch.length)
        try {
            const setConditions = await nftEdition.claimConditions.setBatch(conditionsBatch)
            //const setConditions = await nftEdition.claimConditions.set(1,claimConditions)
            console.log(setConditions)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* Content */}
            <div className={styles.container}>
                {/* Top Section */}
                <h1 className={styles.h1}>Admin Section</h1>

                <hr className={styles.divider} />

                <div className="main">
                    <a className={styles.mainButton} onClick={() => setClaims()}>
                        Deploy Conditions
                    </a>
                </div>
            </div>
        </>
    );
};

export default Admin;
