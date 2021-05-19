import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import { useEffect, useState, Fragment } from 'react';
import { MongoClient } from 'mongodb';

const HomePage = props => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='all the react meetups'></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  // const response = await fetch();
  try {
    MongoClient.connect();
    const client = await MongoClient.connect(
      'mongodb+srv://Unkie:!QAZ1qaz@WSX2wsx@myfirsttestcluster.jbxhv.mongodb.net/myFirstMeetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollection = db.collection('myFirstMeetups');
    const meetups = await meetupsCollection.find().toArray();
    //   console.log('meetups: ', meetups);
    client.close();

    return {
      props: {
        meetups: meetups.map(elem => ({
          title: elem.title,
          address: elem.address,
          image: elem.image,
          id: elem._id.toString(),
        })),
      },
      revalidate: 1,
    };
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export default HomePage;
