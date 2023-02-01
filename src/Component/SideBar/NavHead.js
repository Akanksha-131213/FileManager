import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';


import {changeFolder} from '../../redux/action/filefolderCreator';


export default function NavHead  ({data}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleDblClick=(itemId)=>{
 
    dispatch(changeFolder(itemId));
    navigate(`/home/folder/${itemId}`);


}
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={()=>handleDblClick(nodes.id)} >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: "100vh", flexGrow: 1, maxWidth:"100vh", overflowY: 'auto' }}
    >
      {renderTree(data[0])}
      {/* {console.log(data)} */}
    </TreeView>
  );
}