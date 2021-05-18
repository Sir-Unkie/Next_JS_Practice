import { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = props => {
  return (
    <MeetupDetail
      address={props.meetupData.address}
      title={props.meetupData.title}
      image={props.meetupData.image}
      description={props.meetupData.description}
    ></MeetupDetail>
  );
};

export const getStaticPaths = async () => {
  MongoClient.connect();
  const client = await MongoClient.connect(
    'mongodb+srv://Unkie:!QAZ1qaz@WSX2wsx@myfirsttestcluster.jbxhv.mongodb.net/myFirstMeetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('myFirstMeetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  //   console.log(meetups);
  return {
    paths: meetups.map(elem => ({
      params: {
        meetupId: elem._id.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  MongoClient.connect();
  const client = await MongoClient.connect(
    'mongodb+srv://Unkie:!QAZ1qaz@WSX2wsx@myfirsttestcluster.jbxhv.mongodb.net/myFirstMeetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('myFirstMeetups');
  const selectMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectMeetup._id.toString(),
        title: selectMeetup.title,
        image: selectMeetup.image,
        description: selectMeetup.description,
        address: selectMeetup.address,
      },
    },
  };
};

export default MeetupDetails;
