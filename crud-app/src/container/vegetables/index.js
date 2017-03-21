import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddVegetable from './addVegetables';
import EditVegetable from './editVegetable';
import { Link } from "react-router-dom";

export default class Vegetable extends Component {
    constructor(props){
        super(props);
        this.state = {
            vegetables: [],
            newVegetableData: {
                name: "",
                price: "",
                contact_name: "",
                contact_number: "",
            },
            isLoading: false,
            status: "",
            redirect: false,
            newVegetableModal: false,
            editVegetableData: {
                id: "",
                name: "",
                price: "",
                contact_name: "",
                contact_number: ""
            },
            editVegetableModal: false,
            noDataFound: ""
        }
    }

    componentDidMount() {
        this.getVegetables();
    }    

    getVegetables() {
        axios.get("http://localhost:8000/api/vegetables").then((response) => {
            if (response.status === 200) {
                this.setState({
                    vegetables: response.data.data ? response.data.data : [],
                });
            }
            if (response.data.status === "failed" && response.data.success === false) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    } 
    
    toggleNewVegetableModal = () => {
        this.setState({
          newVegetableModal: !this.state.newVegetableModal,
        });
      };

    onChangeAddVegetableHandler = (e) => {
        let { newVegetableData } = this.state;
        newVegetableData[e.target.name] = e.target.value;
        this.setState({ newVegetableData });
    };

    signOut = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        setTimeout(() => {
            location.reload();
        }, 15);
    };
    addVegetable = () => {
        axios
          .post(
            "http://localhost:8000/api/create-vegetable",
            this.state.newVegetableData
          )
          .then((response) => {
            const { vegetables } = this.state;
            const newVegetables = [...vegetables];
            newVegetables.push(response.data);
            this.setState(
              {
                vegetables: newVegetables,
                newVegetableModal: false,
                newVegetableData: {
                  name: "",
                  price: "",
                  contact_name: "",
                  contact_number: "",
                },
              },
              () => this.getVegetables()
            );
          });
      };

    toggleEditVegetableModal = () => {
        this.setState({
            editVegetableModal: !this.state.editVegetableModal,
        });
    };

    onChangeEditVegetableHanler = (e) => {
    let { editVegetableData } = this.state;
    editVegetableData[e.target.name] = e.target.value;
    this.setState({ editVegetableData });
    };

    editVegetable = (id, name, price, contact_name, contact_number) => {
        this.setState({
            editVegetableData: { id, name, price, contact_name, contact_number },
            editVegetableModal: !this.state.editVegetableModal,
        });
    };
    
    updateVegetable = () => {
    let {
        id,
        name,
        price,
        contact_name,
        contact_number,
    } = this.state.editVegetableData;
    this.setState({
        isLoading: true,
    });
    axios
        .post("http://localhost:8000/api/create-vegetable", {
            name,
            price,
            contact_name,
            contact_number,
            id,
        })
        .then((response) => {
            this.getVegetables();
            this.setState({
                editVegetableModal: false,
                editVegetableData: { name, price, contact_name, contact_number },
                isLoading:false,
            });
        })
        .catch((error) => {
            this.setState({isLoading:false})
        });
    };

    deletVegetable = (id) => {
    this.setState({
        isLoading: true,
    });
    axios
        .delete("http://localhost:8000/api/vegetable/" + id)
        .then((response) => {
            this.setState({
                isLoading: false,
            });
            this.getVegetables();
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
            });
        });
    };
    render() {
        const { newVegetableData, editVegetableData, noDataFound, vegetables} = this.state;
        let vegetablesDetails = [];
        if (vegetables.length) {
            vegetablesDetails = vegetables.map((vegetable) => {
                return (
                    <tr key={vegetable.id}>
                        <td>{vegetable.id}</td>
                        <td>{vegetable.name}</td>
                        <td>{vegetable.price}</td>
                        <td>{vegetable.contact_name}</td>
                        <td>{vegetable.contact_number}</td>
                        <td>
                            <Button
                            color="success"
                            className="mr-3"
                            size="sm"
                            onClick={() =>
                                this.editVegetable(
                                    vegetable.id,
                                    vegetable.name,
                                    vegetable.price,
                                    vegetable.contact_name,
                                    vegetable.contact_number
                                )
                            }
                            >
                            Edit
                            </Button>
                            <Button
                            color="danger"
                            size="sm"
                            onClick={() => this.deletVegetable(vegetable.id)}
                            >
                            Delete
                            </Button>
                        </td>
                    </tr>
                );
            });
        }
        if (this.state.isLoading) {
            return <div className="spinner-border text-center" role="status"> <span className="sr-only">Loading...</span></div>
        } 
   
        return (
        <div className="App container mt-4">
            <h4 className="font-weight-bold vege-title" >Vegetables Registration</h4> 
            
            <div className="signout"><Link to="/" onClick={() => this.signOut()}>SignOut</Link></div>
            <AddVegetable
                toggleNewVegetableModal={this.toggleNewVegetableModal}
                newVegetableModal={this.state.newVegetableModal}
                onChangeAddVegetableHandler={this.onChangeAddVegetableHandler}
                addVegetable={this.addVegetable}
                newVegetableData={newVegetableData}
            />
            <EditVegetable
            toggleEditVegetableModal={this.toggleEditVegetableModal}
            editVegetableModal={this.state.editVegetableModal}
            onChangeEditVegetableHanler={this.onChangeEditVegetableHanler}
            editVegetable={this.editVegetable}
            editVegetableData={editVegetableData}
            updateVegetable={this.updateVegetable}
            />
            <Table className="ddd">
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Contact Name</th>
                <th>Contact Number</th>
                <th>Actions</th>
                </tr>
            </thead>
            {vegetables.length === 0 ? (
                <tbody>
                <tr>
                    <td>
                        <h3>{noDataFound}</h3>
                    </td>
                </tr>
                </tbody>
            ) : (
                <tbody>{vegetablesDetails}</tbody>
            )}
            </Table>
        </div>
        );
    }
}