import React, { Component } from 'react'
import axios from 'axios'

const ai = axios.create({
  baseURL: 'https://api.thetradingprofits.com/api/leads/'
});

const tokenString = localStorage.getItem('token');
const userToken = JSON.parse(tokenString);
const token = userToken?.access;

class Dashboard extends Component {
    constructor(props) {
    super(props);
    this.state = {
    	data : [],
	    name: '',
	  	email: "",
	    landing_page: '',
	    subject: '',
	    message: 'Test {{link}}',
	    uuid: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showLeads = () => {
    ai.get('', { 
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		} 
	})
    .then((res) => {
      this.setState({data: res.data})
    })
  }

  landingPageData = () => {
    axios.get("https://api.thetradingprofits.com/api/pages/", {
		headers: {
			"Authorization": `Bearer ${token}`
		} 
	})
    .then((res) => {
		this.setState({uuid: res.data})
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    let d = 
    {
		"name": this.state.name,
		"email": this.state.email,
		"landing_page": this.state.landing_page,
		"subject": this.state.subject,
		"message": this.state.message + token
    }

    ai.post('', d, {
		headers: {
			"Authorization": "Bearer " + token,
			"Content-Type": "application/json"
		} 
	})
    .then((res) => {
      this.showLeads();
    })

  }

  componentDidMount(){
    this.showLeads();
    this.landingPageData();
  }

  render() {
    return (
		<>
	      	<div>
	            <div>
	            <h4>Leads</h4>
	                <table class="table table-striped table-sm">
	                    <thead>
	                        <tr>
	                            <th>S.NO</th>
	                            <th>Name</th>
	                            <th>Email</th>
	                            <th>Landing Page</th>
	                            <th>Subject</th>
	                            <th>Message</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                    	{
	                    		this.state.data.map((d, i) => 
	                    			(
		                    			<tr key={i} id={i+1}>
		                    				<td>{d.id}</td>
		                    				<td>{d.name}</td>
		                    				<td>{d.email}</td>
		                    				<td>{d.landing_page}</td>
		                    				<td>No subject</td>
		                    				<td>No message</td>
		                    			</tr>
	                    			)
	                    		)
	                    	}
	                    </tbody>
	                </table>
	            </div>
	            <div style = {{ marginTop : 50 }}>
	            	<h4>New Lead</h4>
		        	<form onSubmit={this.handleSubmit}>
		        		<label>
				          Name:
				          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} required class="form-control"/>
				        </label><br />
				        <label>
				          Email:
				          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required class="form-control"/>
				        </label><br />
				        <label>
				          Landing Page:
				          <select name="landing_page" value={this.state.landing_page} onChange={this.handleChange} required class="form-control">
				          	<option value="" disabled>Select...</option>
				          	{
	                    		this.state.uuid.map((d, i) => 
	                    			(
		                    			<option key={i} value={d.uuid}>{d.uuid}</option>
	                    			)
	                    		)
	                    	}
				          </select>
				        </label><br />
				        <label>
				          Subject:
				          <input type="text" name="subject" value={this.state.subject} onChange={this.handleChange} required class="form-control"/>
				        </label><br />
				        <label>
				          Message:
				          <input type="text" name="message" value={this.state.message} onChange={this.handleChange} required class="form-control"/>
				        </label><br /><br />
						<input type="submit" value="Submit" />
				    </form>
	            </div>
	        </div>
	    </>
    )
  }
}

export default Dashboard;