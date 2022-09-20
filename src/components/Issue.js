import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Issue() {
    return (
        <Tabs>
            <TabList>
                <Tab>Issues by you</Tab>
                <Tab>Post Issue</Tab>
            </TabList>

            <TabPanel>
                <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
        </Tabs>
    )
}