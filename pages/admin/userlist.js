import React from 'react';
import Layout from '../../component/Layout';
import UserListing from '../../component/UserListing';

function userlist() {
  return(
    <Layout>
        <div>
          <UserListing/>
        </div>
    </Layout>
      
  );
}

export default userlist;
