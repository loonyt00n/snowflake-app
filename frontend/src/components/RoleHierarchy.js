// frontend/src/components/RoleHierarchy.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const RoleHierarchy = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const transformDataToElements = useCallback((data, parentId = null, level = 0, posX = 0) => {
    const nodes = [];
    const edges = [];
    let offsetX = posX;
    data.forEach((role) => {
      const nodeId = role.id.toString();
      nodes.push({
        id: nodeId,
        type: 'default',
        data: { label: role.role_name },
        position: { x: offsetX, y: level * 100 }
      });
      if (parentId) {
        edges.push({
          id: `e${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          type: 'simplebezier'
        });
      }
      offsetX += 200; // Adjust the X position for spacing
      const { nodes: childNodes, edges: childEdges } = transformDataToElements(role.sub_roles || [], nodeId, level + 1, offsetX);
      nodes.push(...childNodes);
      edges.push(...childEdges);
    });
    return { nodes, edges };
  }, []); // Add any dependencies here if needed

  useEffect(() => {
    axios.get('/api/role-hierarchy-sample')
      .then(response => {
        console.log('Fetched data:', response.data); // Log fetched data
        setRoles(response.data); // Set roles from fetched data
        const { nodes, edges } = transformDataToElements(response.data);
        console.log('Transformed nodes:', nodes); // Log transformed nodes
        console.log('Transformed edges:', edges); // Log transformed edges
        setNodes(nodes);
        setEdges(edges);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [transformDataToElements]);

  const onNodeClick = (event, node) => {
    const role = findRoleById(roles, parseInt(node.id));
    console.log('Clicked role:', role); // Log clicked role
    setSelectedRole(role);
  };

  const findRoleById = (rolesList, id) => {
    for (const role of rolesList) {
      if (role.id === id) return role;
      const subRole = findRoleById(role.sub_roles || [], id);
      if (subRole) return subRole;
    }
    return null;
  };

  const handleAddRole = () => {
    if (selectedRole && newRoleName) {
      const newSubRole = {
        id: Date.now(), // Just a placeholder ID for example
        role_name: newRoleName,
        sub_roles: []
      };
      selectedRole.sub_roles.push(newSubRole);
      const { nodes, edges } = transformDataToElements(roles);
      setNodes(nodes);
      setEdges(edges);
      setNewRoleName('');
    }
  };

  const handleDeleteRole = (roleToDelete) => {
    const deleteRole = (rolesList) => {
      return rolesList.filter(role => {
        if (role.id === roleToDelete.id) return false;
        role.sub_roles = deleteRole(role.sub_roles || []);
        return true;
      });
    };
    const updatedRoles = deleteRole(roles);
    setRoles(updatedRoles);
    const { nodes, edges } = transformDataToElements(updatedRoles);
    setNodes(nodes);
    setEdges(edges);
    setSelectedRole(null);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '70%', height: '100%' }}>
        <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodeClick={onNodeClick} 
            style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}
            nodesDraggable
            >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div style={{ width: '30%', padding: '20px', borderLeft: '1px solid #ccc' }}>
        {selectedRole && (
          <>
            <h3>Role Details</h3>
            <p><strong>ID:</strong> {selectedRole.id}</p>
            <p><strong>Name:</strong> {selectedRole.role_name}</p>
            <h4>Add Sub Role</h4>
            <input 
              type="text" 
              placeholder="Sub Role Name" 
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <button onClick={handleAddRole}>Add Role</button>
            <h4>Actions</h4>
            <button onClick={() => handleDeleteRole(selectedRole)}>Delete Role</button>
          </>
        )}
      </div>
    </div>
  );
};

export default RoleHierarchy;
