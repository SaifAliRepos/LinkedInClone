import React, { Fragment, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PostShow from '../Posts/PostShow';
import { PostContext } from '../Context/PostsContext';
import { useParams } from 'react-router-dom';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ProfileTabs = (props) => {
  const { user_id } = useParams();
  const [value, setValue] = React.useState(0);

  const { userPosts, handleRemovePost, fetchData } = useContext(PostContext);

  useEffect(() => {
    fetchData(user_id);
  }, [user_id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <div className='bg-white p-3 rounded border mb-3'>
        <h4 className='mb-3'>
          <strong>Saif's Activity</strong>
        </h4>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Articles' />
          <Tab label='Comments' />
          <Tab label='Documents' />
        </Tabs>
      </div>
      <div className='rounded'>
        <Box sx={{ width: '100%' }}>
          <TabPanel value={value} index={0}>
            <PostShow
              posts={userPosts}
              fetchData={fetchData}
              handleRemovePost={handleRemovePost}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </div>
    </Fragment>
  );
};

export default ProfileTabs;
