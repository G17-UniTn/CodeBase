import CircleSkeleton from '@/components/LoadingSkeletons/CircleSkeleton';
import RectangleSkeleton from '@/components/LoadingSkeletons/RectangleSkeleton';
import { firestore } from '@/firebase/firebase';
import { DBproblem, Problem } from '@/utils/problems/GenericProblem/genericProblem';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiFillDislike, AiFillHeart, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from "react-icons/ti"

type DescriptionProps = {
    problem: Problem;
};

const Description:React.FC<DescriptionProps> = ({problem}) => {
    const {currentProblem,loading,problemDiff} = useGetCurrentProblem(problem.id);
    
    return (<div className='bg-dark-layer-1'>
    {/* TAB */}
    <div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
        <div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
            Description
        </div>
    </div>

    <div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
        <div className='px-5'>
            {/* Header del prob */}
            <div className='w-full'>
                <div className='flex space-x-4'>
                    <div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.title}</div>
                </div>
                {!loading && currentProblem && (
                <div className='flex items-center mt-3'>
                    <div
                        className={`${problemDiff} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                    >
                        {currentProblem.difficulty}
                    </div>
                    <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
                        <BsCheck2Circle />
                    </div>
                    <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
                        <AiFillHeart /> 
                        <span className='text-xs'>{currentProblem.likes }</span>
                    </div>
                </div>
                )}

                {loading && (
                    <div className="mt-3 flex space-x-2">
                        <RectangleSkeleton />
                        <CircleSkeleton />
                        <RectangleSkeleton />
                        <RectangleSkeleton />
                        <CircleSkeleton />
                    </div>

                )}
                {/* Problem Statement(paragraphs) */}
                <div className='text-white text-sm'>
                    <div dangerouslySetInnerHTML={{__html: problem.problemStatement}}>
                        

                    </div>
                </div>

                {/* Examples */}
                <div className='mt-4'>
                 {problem.examples.map((example,index) => (
                    <div key={example.id}>
                 
                        <p className='font-medium text-white '>Esempio {index + 1} </p>
                        {example.img && (
                            <img src={example.img} alt="" className="mt-3" />
                        )}
                        <div className='example-card'>
                            <pre>
                                <strong className='text-white'>Input: </strong> {example.inputText}
                                <br />
                                <strong>Output:</strong> {example.outputText} <br />
                                {example.explanation && (
                                    <>
                                        <strong>Explanation:</strong>{example.explanation}
                                    </>
                                )}
                            </pre>
                        </div>
                    </div>
                    ))}
                </div>
                

                {/* Constraints */}
                <div className='my-8 pb-5'>
                    <div className='text-white text-sm font-medium'>Constraints:</div>
                    <ul className='text-white ml-5 list-disc'>
                       <div dangerouslySetInnerHTML={{__html:problem.constraints.toString()}}></div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
   );
};

export default Description;


function useGetCurrentProblem(problemId:string){
    const [currentProblem,setCurrentProblem] = useState<DBproblem | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [problemDiff,setProblemDiff] = useState<string>("");
    useEffect(() => {
        const getCurrentProblem = async () => {
            setLoading(true)
            const docRef = doc(firestore,"problems",problemId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                const problem = docSnap.data();
                setCurrentProblem({id:docSnap.id, ...problem} as DBproblem)
                setProblemDiff(
                    problem.difficulty ===  "Facile" ? " bg-olive text-dark-green-s" : problem.difficulty === "Medio" ? " bg-dark-yellow text-dark-yellow" : "bg-dark-pink text-dark-pink" 
                )
            }
            console.log(docSnap)
            setLoading(false)
        };
        getCurrentProblem();
    },[problemId])

    return {currentProblem,loading,problemDiff};
}