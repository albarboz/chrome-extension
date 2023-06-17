import { useState, useEffect, ChangeEvent } from 'react';
import Draggable from 'react-draggable';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/LinkManager.css'

type OptionLinks = {
  [key: string]: { name: string; link: string }[];
};

export default function LinkManager(): JSX.Element {
  const [newName, setNewName] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [optionLinks, setOptionLinks] = useState<OptionLinks>({});

  const titles = ['Diablo', 'Black Desert', 'LOFI'];

  useEffect(() => {
    const storedLinks = localStorage.getItem('links');
    if (storedLinks) {
      try {
        const parsedLinks = JSON.parse(storedLinks) as OptionLinks;
        if (parsedLinks && Object.keys(parsedLinks).length > 0) {
          setOptionLinks(parsedLinks);
        }
      } catch (error) {
        console.error('Error parsing links from local storage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(optionLinks));
  }, [optionLinks]);

  function handleTitleChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedTitle(event.target.value);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  function handleLinkChange(event: ChangeEvent<HTMLInputElement>) {
    setNewLink(event.target.value);
  }

  function addLink() {
    if (newLink.trim() !== '' && newName.trim() !== '') {
      const updatedLinks = { ...optionLinks };
      if (!updatedLinks[selectedTitle]) {
        updatedLinks[selectedTitle] = [];
      }
      updatedLinks[selectedTitle].push({ name: newName, link: newLink });
      setOptionLinks(updatedLinks);
      setNewName('');
      setNewLink('');
    }
  }

  function deleteLink(index: number) {
    const updatedLinks = { ...optionLinks };
    if (updatedLinks[selectedTitle]) {
      updatedLinks[selectedTitle] = updatedLinks[selectedTitle].filter((_, i) => i !== index);
      setOptionLinks(updatedLinks);
    }
  }

  return (
    <Draggable>
      <div className="link-container">
        <input className="input-link" value={newName} onChange={handleNameChange} placeholder="Name" />
        <input className="input-link" value={newLink} onChange={handleLinkChange} placeholder="Link" />
        <button className="add-link-button" onClick={addLink}>
          Add
        </button>
        <select className="select-container" value={selectedTitle} onChange={handleTitleChange}>
          <option value="">Select a title</option>
          {titles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
        <div className="displayed-links-container" style={{ height: optionLinks[selectedTitle]?.length ? 'auto' : 0 }}>
          {optionLinks[selectedTitle] &&
            optionLinks[selectedTitle].map((item, index) => (
              <div className="link-text" key={index}>
                <FontAwesomeIcon
                  icon={faCircleMinus}
                  className="minus-icon"
                  onClick={() => deleteLink(index)}
                />
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="link">
                  <h4>{item.name}</h4>
                </a>

            </div>
          ))}
      </div>
    </div>
  </Draggable>
);
}
