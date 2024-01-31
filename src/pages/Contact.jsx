import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Modal } from 'react-bootstrap';

import '../styles/contact.scss'
import './contact.css';

import {
	AiFillDelete,
	AiFillEdit
} from 'react-icons/ai'

export default function Contact() {

	const [id, setId] = useState('');
	const [description, setDescription] = useState('')
	const [moduleName, setModuleName] = useState('');
	const [moduleSection, setModuleSection] = useState('');
	const [isPublic, setIsPublic] = useState(true);
	const [isActive, setIsActive] = useState(true);
	const [isMenuItem, setIsMenuItem] = useState(true);
	const [order1, setOrder1] = useState('');
	const [order2, setOrder2] = useState('');
	const [order3, setOrder3] = useState('');

	const [modalShow, setModalShow] = React.useState(false);

	const [cmPageData, setCMPageData] = useState()


	const [formData, setFormData] = useState({})

	const handleAdd = async () => {
		const data = {
			id,
			description,
			moduleName,
			moduleSection,
			isPublic: isPublic === "true" ? true : false,
			isActive: isActive === "true" ? true : false,
			isMenuItem: isMenuItem === "true" ? true : false,
			order1,
			order2,
			order3
		}

		try {
			const res = await axios.post('http://localhost:8080/api/cmPage', data)

			setCMPageData(res.data)
		} catch (error) {
			console.log('Error at line 44 ', error)
		}

	}

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`http://localhost:8080/api/cmPage/${id}`)
			setCMPageData(res.data.cmPageData)
		} catch (error) {
			console.log('Error at line 54 ', error)
		}
	}

	useEffect(() => {

		getCMPage()
	}, [])

	const getCMPage = async () => {
		try {
			const res = await axios.get('http://localhost:8080/api/cmPage')

			setCMPageData(res.data)
		} catch (error) {
			console.log('Error at line 47 ', error)
		}
	}

	return (
		<div style={{ padding: 20 }}>

			<Form>
				<table>
					<tbody>
						<tr>
							<td>
								<Form.Group className="mb-3 me-2" controlId="formBasicEmail">
									<Form.Label>ID</Form.Label>
									<Form.Control type="number" placeholder="Enter id" onChange={(e) => setId(e.target.value)} />
								</Form.Group>
							</td>

							<td>
								<Form.Group className="mb-3 me-2" controlId="formBasicEmail">
									<Form.Label>Description</Form.Label>
									<Form.Control type="text" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} />
								</Form.Group>
							</td>

							<td>
								<Form.Group className="mb-3 me-2" controlId="formBasicEmail">
									<Form.Label>Module Name</Form.Label>
									<Form.Control type="text" placeholder="Enter name" onChange={(e) => setModuleName(e.target.value)} />
								</Form.Group>
							</td>

							<td>
								<Form.Group className="mb-3 me-2" controlId="formBasicEmail">
									<Form.Label>Module Section</Form.Label>
									<Form.Control type="text" placeholder="Enter section" onChange={(e) => setModuleSection(e.target.value)} />
								</Form.Group>
							</td>

							<td style={{ width: 110 }}>
								<Form.Group className="mb-3 me-2">
									<Form.Label>Public</Form.Label>
									<Form.Select id="disabledSelect" onChange={(e) => setIsPublic(e.target.value)}>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</Form.Select>
								</Form.Group>
							</td>

							<td style={{ width: 110 }}>
								<Form.Group className="mb-3 me-2">
									<Form.Label>Active</Form.Label>
									<Form.Select id="disabledSelect" onChange={(e) => setIsActive(e.target.value)}>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</Form.Select>
								</Form.Group>
							</td>

							<td style={{ width: 110 }}>
								<Form.Group className="mb-3 me-2">
									<Form.Label>Menu Item</Form.Label>
									<Form.Select id="disabledSelect" onChange={(e) => setIsMenuItem(e.target.value)}>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</Form.Select>
								</Form.Group>
							</td>

							<td style={{ width: 110 }}>
								<Form.Group className="mb-3 me-2" controlId="formBasicEmail">
									<Form.Label>Sort Order 1</Form.Label>
									<Form.Control type="number" placeholder="" onChange={(e) => setOrder1(e.target.value)} />
								</Form.Group>
							</td>

							<td style={{ width: 110 }}>
								<Form.Group className="mb-3 me-2" controlId="formBasicEmail">
									<Form.Label>Sort Order 2</Form.Label>
									<Form.Control type="number" placeholder="" onChange={(e) => setOrder2(e.target.value)} />
								</Form.Group>
							</td>

							<td style={{ width: 110 }}>
								<Form.Group className="mb-3 me-2" controlId="formBasicEmail">
									<Form.Label>Sort Order 3</Form.Label>
									<Form.Control type="number" placeholder="" onChange={(e) => setOrder3(e.target.value)} />
								</Form.Group>
							</td>

							<td>
								<Button onClick={handleAdd}>Add</Button>
							</td>
						</tr>
					</tbody>
				</table>



			</Form>


			{/* <Table striped bordered hover>
				<thead>
					<tr>
						<th>CM Page ID</th>
						<th style={{ width: 300 }}>Description</th>
						<th>Module Name</th>
						<th>Module Section</th>
						<th>Public</th>
						<th>Active</th>
						<th>Menu Item</th>
						<th>SO 1</th>
						<th>SO 2</th>
						<th>SO 3</th>
					</tr>
				</thead>
				<tbody className='table-body'>
					{
						cmPageData?.map(item => (

							<tr key={item?.CMPageObjectID} >
								<td style={{}}>{item?.CMPageObjectID}</td>
								<td>{item?.Description}</td>
								<td>{item?.ModuleName}</td>
								<td>{item?.ModuleSection}</td>
								<td>{item?.isPublic === true ? 'Yes' : 'No'}</td>
								<td>{item?.isActive === true ? 'Yes' : 'No'}</td>
								<td>{item?.isMenuItem === true ? 'Yes' : 'No'}</td>
								<td>{item?.SortOrder1}</td>
								<td>{item?.SortOrder2}</td>
								<td>{item?.SortOrder3}</td>
								<td>
									<Button variant="danger" type="submit" onClick={() => handleDelete(item?.CMPageObjectID)}>
										Delete
									</Button>
								</td>
								<td>
									<Button variant="primary" type="submit" onClick={() => {
										setFormData(item)
										setModalShow(true)
									}}>
										Edit
									</Button>
								</td>
							</tr>

						))
					}
				</tbody>
			</Table> */}

			<div className="table-container">
				<table className="table">
					<thead className="table-header">
						<tr>
							<th style={{ width: '10%' }}>CM Page ID</th>
							<th style={{ width: '25%' }}>Description</th>
							<th style={{ width: '15%' }}>Module Name</th>
							<th style={{ width: '10%' }}>Module Section</th>
							<th style={{ width: '5%' }}>Public</th>
							<th style={{ width: '5%' }}>Active</th>
							<th style={{ width: '5%' }}>Menu It.</th>
							<th tyle={{ width: '1%' }}>SO 1</th>
							<th tyle={{ width: '1%' }}>SO 2</th>
							<th tyle={{ width: '1%' }}>SO 3</th>
						</tr>
					</thead>

					<tbody >
						{
							cmPageData?.map(item => (

								<tr key={item?.CMPageObjectID} >
									<td style={{}}>{item?.CMPageObjectID}</td>
									<td>{item?.Description}</td>
									<td>{item?.ModuleName}</td>
									<td>{item?.ModuleSection}</td>
									<td>{item?.isPublic === true ? 'Yes' : 'No'}</td>
									<td>{item?.isActive === true ? 'Yes' : 'No'}</td>
									<td>{item?.isMenuItem === true ? 'Yes' : 'No'}</td>
									<td>{item?.SortOrder1}</td>
									<td>{item?.SortOrder2}</td>
									<td>{item?.SortOrder3}</td>
									<td>

										<Button variant="danger" className='p-1' type="submit" onClick={() => handleDelete(item?.CMPageObjectID)}>
											<AiFillDelete />
										</Button>
									</td>
									<td>
										<Button variant="primary" className='p-1' type="submit" onClick={() => {
											setFormData(item)
											setModalShow(true)
										}}>
											<AiFillEdit />
										</Button>
									</td>
								</tr>

							))
						}
					</tbody>

				</table>
			</div>

		</div>
	)
}

