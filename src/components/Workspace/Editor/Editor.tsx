import React from 'react';
import Selector from './Selector/Selector';
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import Footer from '../Footer';

type EditorProps = {
    
};

const Editor:React.FC<EditorProps> = () => {
    const boilerplate = `function twosum(nums,target) {
    //Scrivi qui il tuo codice
};`;
    
    return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">

            <Selector/>

                <Split className="h-[calc(100vh-94px)] " direction="vertical" sizes={[60,40]} minSize={60}>
                        <div className="w-full voerflow-auto">
                            <CodeMirror 
                            value={boilerplate}
                            theme={vscodeDark}
                            extensions={[javascript()]}
                            style={{fontSize:16}} />
                        </div>
                        <div className='w-full px-5 overflow-auto'>



                           { /* testcase */}
                            <div className='flex h-10 items-center space-x-6'>
                                <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                    <div className="text-sm font-medium leading-5 text-white">Testcase</div>
                                    <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white"></hr>
                                </div>
                            </div>
                            <div className='flex'>




                                {/*cases*/}
                                <div className="mr-2 items-start mt-2 text-white">
                                    <div className='flex flex-wrap items-center gap-y-4'>
                                        <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>Case 1</div>
                                    </div>
                                </div>
                                <div className="mr-2 items-start mt-2 text-white">
                                    <div className='flex flex-wrap items-center gap-y-4'>
                                        <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>Case 2</div>
                                    </div>
                                </div>
                                <div className="mr-2 items-start mt-2 text-white">
                                    <div className='flex flex-wrap items-center gap-y-4'>
                                        <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>Case 3</div>
                                    </div>
                                </div>


                             </div>
                                {/* input/output */}
                                <div className='font-semibold my-4 '>
                                    <p className='text-sm font-medium mt-4 text-white'> Input:</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                        nums:[2,7,11,15], target: 9
                                    </div>

                                    
                                    <p className='text-sm font-medium mt-4 text-white'> Output:</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                        [0,1]
                                    </div>
                                </div>
                            
                        </div>
                </Split>
                <Footer />
    </div>
    )
}
export default Editor;