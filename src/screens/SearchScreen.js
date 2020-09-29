import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';
import Searchlocation from '../components/SearchLocation';



const SearchScreen = () =>{
    
    const[term, setTerm] = useState('Pasta');
    const [searchApi, results, errormessage] = useResults('');
    const [location, setLocation] = useState('Firenze');

    const filterResultsByPrice = (price) =>{

        return results.filter (result =>{
            return result.price === price;
        });
    };

    return <View style={{flex:1}}>
        <SearchBar term={term}
         onTermChange={setTerm} 
         onTermSubmit={()=>searchApi(term,location)}
        
        />
        <Searchlocation location={location}
            onLocationChange={setLocation}
            onLocationSubmint={()=>searchApi(term,location)}
            
            />

       {errormessage ? <Text>{errormessage}</Text> : null} 
        <Text style={{paddingLeft:15}}>We have found {results.length} results</Text>
        <ScrollView>
        <ResultsList results={filterResultsByPrice('€')}  title="Cost Effective"/>
        <ResultsList results={filterResultsByPrice('€€')} title ="Bit Pricier" />
        <ResultsList results={filterResultsByPrice('€€€')} title ="Bit Spender"/>
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({});

export default SearchScreen;