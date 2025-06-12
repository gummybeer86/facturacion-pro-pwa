import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LicenseForm = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    accessCode: '',
    licenseType: 'trial',
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div>
      <TextField
        id="clientName"
        name="clientName"
        label="Nombre del Cliente"
        variant="outlined"
        fullWidth
        required
        value={formData.clientName}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        id="clientEmail"
        name="clientEmail"
        label="Correo Electrónico"
        variant="outlined"
        fullWidth
        required
        value={formData.clientEmail}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        id="accessCode"
        name="accessCode"
        label="Código de Acceso"
        variant="outlined"
        fullWidth
        required
        value={formData.accessCode}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="licenseType-label">Tipo de Licencia</InputLabel>
        <Select
          id="licenseType"
          name="licenseType"
          labelId="licenseType-label"
          value={formData.licenseType}
          onChange={handleInputChange}
          label="Tipo de Licencia"
        >
          <MenuItem value="trial">Prueba (15 días)</MenuItem>
          <MenuItem value="full">Completa (1 año)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LicenseForm; 