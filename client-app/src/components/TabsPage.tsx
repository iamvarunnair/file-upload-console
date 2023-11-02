import * as React from 'react';
import AtomLine from './AtomLine';
import { TItemTabList } from './TabsPage.interface';

const TabsPage = (props: { tabList: TItemTabList[] }) => {
    const { tabList = [] } = props;
    const classWidth = `w-[calc(100%/${tabList?.length})]`;
    return (
        <div className='w-100'>
            <AtomLine dir='x' />
            <div className='w-100 flex'>
                {tabList?.map(
                    (el: TItemTabList, i: number, arr: TItemTabList[]) => (
                        <>
                            <div
                                className={
                                    // 'w-[calc(100%/2)]' +
                                    classWidth +
                                    ` text-center cursor-pointer hover:scale-110 hover:bg-gray-dark h-content flex items-center justify-center`
                                }
                                onClick={el?.onClickHandler}
                            >
                                <div
                                    className={el?.iconClass + ' w-6 h-6  mr-1'}
                                ></div>
                                <h2 className='font-mallanna text-md md:text-2xl py-2 text-black'>
                                    {el?.name}
                                </h2>
                            </div>
                            {i < arr?.length - 1 ? <AtomLine dir='y' /> : null}
                        </>
                    )
                )}
            </div>
            <AtomLine dir='x' />
        </div>
    );
};

export default TabsPage;
