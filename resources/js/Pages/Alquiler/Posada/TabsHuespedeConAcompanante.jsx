import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import RegistroHuespede from './RegistroHuespede';
export default ({auth,flash,dataRegistro}) => (
  <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <RegistroHuespede
         auth={auth}
         flash={flash}
         dataRegistro={dataRegistro}
      />

    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);