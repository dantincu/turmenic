import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { appThemes, AppTheme } from '../../app/appTheme/appTheme';
import './ThemePicker.scss';

import { ThemePickerProps } from './ThemePickerProps';

const ThemePicker = (props: ThemePickerProps) => {
  const getDropDownItemClassName = (appTheme: AppTheme) => {
    let className = "txqk-dropdown-item";

    if (props.currentThemeId === appTheme.id) {
      className += " txqk-current-item";
    }

    return className;
  }

  const dropDownMenuItems = appThemes.map(appTheme => {
    return {
      theme: appTheme,
      onClick: () => {
        if (props.onThemePicked) {
          props.onThemePicked(appTheme.id);
        }
      },
      className: getDropDownItemClassName(appTheme)
    };
  });

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown className="txqk-theme-picker" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        App theme
      </DropdownToggle>
      <DropdownMenu>
        {
          dropDownMenuItems.map(item => (
              <DropdownItem
                key={ item.theme.id }
                className={ item.className }
                onClick={ item.onClick }>
                  { item.theme.name }
              </DropdownItem>
            )
          )
        }
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default ThemePicker;