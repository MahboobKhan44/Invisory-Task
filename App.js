import React from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomModal from './src/components/CustomModal';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = "@users";


const App = ({ navigation }) => {
  const [documentation, setDocumentation] = React.useState([]);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetchImage();
  }, []);

  const setItem = (value) => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  const getItem = () => AsyncStorage.getItem(STORAGE_KEY);



  const fetchImage = async () => {
    try {
      let getDoc = await getItem();
      if (getDoc) {
        getDoc = JSON.parse(getDoc);
        setDocumentation(getDoc)
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleModalVisibilty = () => {
    setIsModalVisible(!isModalVisible)
  }
  console.log("DDDDDDDDD ", documentation);
  const onPressTakePhoto = async () => {
    try {
      // let photoArray = [];

      // photoArray?.push("file:///storage/emulated/0/Android/data/com.test/files/Pictures/4d6e7a9d-bb06-424b-8f1a-01395b68189b.jpg");
      // await setItem(photoArray);
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.CAMERA,
      //   {
      //     title: 'Cool Photo App Camera Permission',
      //     message:
      //       'Cool Photo App needs access to your camera ' +
      //       'so you can take awesome pictures.',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      //   },
      // );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   ImagePicker.openCamera({
      //     width: 300,
      //     height: 400,
      //     cropping: true,
      //   }).then(image => {
      //     let path = {

      //     }
      //     console.log("IMAGE PATH", image);
      //   });
      // } else {
      //   console.log('Camera permission denied');
      // }


    } catch (err) {
      console.log("ERROR", err);
    }
    // console.log("PRESS TAKE A PHOTO");
    // toggleModalVisibilty();
  }

  const onPressGallery = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      const responsevalue = res;
      let imageArray = [];

      let value = {
        "size": responsevalue[0].size,
        "name": responsevalue[0].name,
        "type": responsevalue[0].type,
        "uri": responsevalue[0].uri,
      }
      imageArray.push(value)
      await setItem(imageArray);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
    // console.log("PRESS GALLERY");
    // toggleModalVisibilty();
  }



  return (
    <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

      <TouchableOpacity onPress={() => {
        toggleModalVisibilty()
      }}
        style={{ height: 47, paddingHorizontal: 10, backgroundColor: "green", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>

        <Text style={{
          color: "white",
          fontSize: 14,
          fontWeight: "500"
        }}>Select Documents</Text>

      </TouchableOpacity>

      <CustomModal
        toggleModalVisibilty={toggleModalVisibilty}
        isModalVisible={isModalVisible}
        onPressTakePhoto={onPressTakePhoto}
        onPressGallery={onPressGallery}
      />

    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;