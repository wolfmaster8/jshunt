import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';


export default class Main extends Component {

    static navigationOptions = {
        title: 'JSHunt'
    };

    state = {
        productInfo: {},
        products: [],
        page: 1,
        loading: true
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({
            products: [...this.state.products, ...docs],
            productInfo: productInfo,
            page,
            loading: false
        })

        console.log(this.state.products)
    }

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity
                style={styles.productButton}
                onPress={() => {
                    this.props.navigation.navigate("Product", { product: item })
                }}>
                <Text style={styles.productButtonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )

    loadMore = () => {
        const { page, productInfo } = this.state;
        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber)
    }

    render() {
        if(this.state.loading) return (
            <View style={styles.loadingView}>
                <Text style={styles.loadingText}>Loading...</Text>
                </View>
        );

        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.products}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fafafa"
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 20,
        margin: 10
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#9c4de4"
    },

    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#9c4de4",
        backgroundColor: "transparent",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: "#9c4de4",
        fontWeight: "bold"
    },
    loadingView: {
        alignItems: "center",
        justifyContent: "center"
    },
    loadingText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})