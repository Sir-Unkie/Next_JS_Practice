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
  try {
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
      fallback: 'blocking',
    };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async context => {
  try {
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
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export default MeetupDetails;
