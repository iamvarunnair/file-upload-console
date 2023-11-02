import * as React from 'react';
import TitlePage from '../components/TitlePage';
import AtomLine from '../components/AtomLine';
import TabsPage from '../components/TabsPage';
import ListFiles from '../components/ListFiles';
import { TItemTabList } from '../components/TabsPage.interface';
import PageUpload from './PageUpload';

const PageLanding = (props: any) => {
    const [selectedTab, setSelectedTab] = React.useState<'files' | 'upload'>(
        'files'
    );
    const tabList: TItemTabList[] = [
        {
            name: 'Files',
            onClickHandler: () => setSelectedTab('files'),
            iconClass: 'icon-folder',
        },
        {
            name: 'Upload',
            onClickHandler: () => setSelectedTab('upload'),
            iconClass: 'icon-arrow-up-tray',
        },
    ];
    return (
        <div className='w-100'>
            <TitlePage />
            <TabsPage {...{ tabList }} />
            {selectedTab === 'files' ? <ListFiles /> : null}
            {selectedTab === 'upload' ? <PageUpload /> : null}
        </div>
    );
};

export default PageLanding;
