import type {JsonRpcSigner} from "@ethersproject/providers";
import {useState, useEffect} from "react";
import {collateralFactorForToken} from "~/lib/tender";
import type {TokenPair} from "~/types/global";
import {ethers} from "ethers";
import SampleComptrollerAbi from "~/config/sample-comptroller-abi";

export function useCollateralFactor(
    signer: JsonRpcSigner | undefined | null,
    comptrollerAddress: string,
    tokenPair: TokenPair
): number {
    let [collateralFactor, setCollateralFactor] = useState<number>(0);

    useEffect(() => {
        if (!signer || !tokenPair || !comptrollerAddress) {
            return;
        }

        let comptrollerContract = new ethers.Contract(
            comptrollerAddress,
            SampleComptrollerAbi,
            signer
        );

        collateralFactorForToken(
            signer,
            comptrollerContract,
            tokenPair
        ).then(
            (cf) => setCollateralFactor(cf)
        );
    }, [signer, comptrollerAddress, tokenPair]);

    return collateralFactor;
}
