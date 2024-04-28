<script setup>
import { ref, onMounted, computed } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import Swal from 'sweetalert2';

  DataTable.use(DataTablesCore);

  let tableData = ref([]);
  const dataReady = ref(false);
  let showModal = ref(false);
  let selectedStatus = ref("-- Pilih Status --");


  const columns = [
    { data: 'No' },
    { data: 'Tanggal',
      render: function(data, type, row) {
        let cellContent = '';
        if (row.Status === "selesai") {
          cellContent = '<span class="text-decoration-line-through">' + data + '</span>';
        } else {
          cellContent = data;
        }
        return cellContent;
      }
    },
    { data: 'Nama_Acara',
      render: function(data, type, row) {
        let cellContent = '';
        if (row.Status === "selesai") {
          cellContent = '<span class="text-decoration-line-through">' + data + '</span>';
        } else {
          cellContent = data;
        }
        return cellContent;
      }
    },
    { data: 'Keterangan',
      render: function(data, type, row) {
        let cellContent = '';
        if (row.Status === "selesai") {
          cellContent = '<span class="text-decoration-line-through">' + data + '</span>';
        } else {
          cellContent = data;
        }
        return cellContent;
      }
    },
    { data: 'Status',
      render : function(data, type, row) {
        let status ='';
        if (data == "selesai") {
          status = '<span class="badge bg-success">'+data+'</span>';
        }else if(data == "on-going") {
          status = '<span class="badge bg-warning">'+data+'</span>';
        }else{
          status = '<span class="badge bg-danger">'+data+'</span>';
        }
        return status
      }    
    },
    {
      data: null,
      render: '#action',
      title: 'Action'
    },
  ];


  const closeModal = () => {
    showModal.value = false;
  };

  const alertSuccess = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Data Berhasil Ditambahkan.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };
  
  const batalkan = (data) => {
    Swal.fire({
        title: 'Data ' + data.rowData.Nama_Acara + ' akan dibatalkan ?',
        text: "Data tidak bisa dikembalikan setelah dibatalkan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Ya, Cancel!',
        cancelButtonText: `Close`,
    }).then((result) => {
        if (result.isConfirmed) {
          let existingData = localStorage.getItem('dataAcara');
          let jsonData = JSON.parse(existingData);
          // If no existing data, initialize an empty array
          if (!existingData) {
            existingData = [];
          } else {
            // Parse the existing JSON array
            jsonData[data.rowIndex].status = "batal";
          }
          // Store the updated array back into local storage
          localStorage.setItem('dataAcara', JSON.stringify(jsonData));
          alertSuccess();
          location.reload();
        }
    })
  }

  const selesai = (data) => {
    Swal.fire({
        title: 'Data ' + data.rowData.Nama_Acara + ' akan diselesaikan ?',
        text: "Data tidak bisa dikembalikan setelah diselesaikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Selesai!',
        cancelButtonText: `Close`,
    }).then((result) => {
        if (result.isConfirmed) {
          let existingData = localStorage.getItem('dataAcara');
          let jsonData = JSON.parse(existingData);
          // If no existing data, initialize an empty array
          if (!existingData) {
            existingData = [];
          } else {
            // Parse the existing JSON array
            jsonData[data.rowIndex].status = "selesai";
          }
          // Store the updated array back into local storage
          localStorage.setItem('dataAcara', JSON.stringify(jsonData));
          alertSuccess();
          location.reload();
        }
    })
  }


const filteredData = computed(() => {
  if (!tableData.value) {
    return []; // Return an empty array if tableData is undefined or null
  }

  if (selectedStatus.value === "-- Pilih Status --") {
    return tableData.value;
  } else {
    return tableData.value.filter(item => item.Status === selectedStatus.value);
  }
});
// Retrieve and map data from local storage
const fetchDataFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataAcara');
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      let idx = 1;
      tableData.value = parsedData.map(item => ({
        No: idx++,
        Tanggal: item.tanggal,
        'Nama_Acara': item.nama_acara,
        Keterangan: item.keterangan,
        Status: item.status,
      }));
      dataReady.value = true;
    } catch (error) {
      console.error('Error parsing or mapping data:', error);
    }
  }
};

// Fetch data from local storage when the component is mounted
onMounted(fetchDataFromLocalStorage);

const saveChanges = () => {
  // Handle saving changes or form submission here
  // Once done, you can close the modal
  let tanggal = document.getElementById("tanggal").value;
  let nama_acara = document.getElementById("nama_acara").value;
  let keterangan = document.getElementById("keterangan").value;

  // New data to append
  const newData = {
    tanggal: tanggal,
    nama_acara: nama_acara,
    keterangan: keterangan,
    status: "on-going",
  };
  
  let existingData = localStorage.getItem('dataAcara');

  // If no existing data, initialize an empty array
  if (!existingData) {
    existingData = [];
  } else {
    // Parse the existing JSON array
    existingData = JSON.parse(existingData);
  }

  // Append the new data to the existing array
  existingData.push(newData);

  // Store the updated array back into local storage
  localStorage.setItem('dataAcara', JSON.stringify(existingData));
  closeModal();
  alertSuccess();
  location.reload();
};



</script>

  <template>

  <div class="container">
    <div class="d-flex justify-content-between m-5">
      <h2>To Do List</h2>
      <button @click="showModal = true" class="btn btn-success">Tambah Acara</button>
    </div>
    <div class="row" v-if="dataReady">
      <div class="col-3">
        <select class="form-select mb-3" v-model="selectedStatus">
          <option value="-- Pilih Status --" selected>-- Pilih Status --</option>
          <option value="on-going">On Going</option>
          <option value="selesai">Selesai</option>
          <option value="batal">Dibatalkan</option>
        </select>
      </div>
    </div>
    <DataTable
      :columns="columns"
      :data="filteredData"
      class="table table-hover table-striped"
      width="100%"
    >
      <thead>
        <tr>
          <th>No</th>
          <th>Tanggal</th>
          <th>Nama Acara</th>
          <th>Keterangan</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <template #action="props">
          <button class='btn btn-danger'
              @click="batalkan(props)"
              v-if="props.rowData.Status == 'on-going'"
          >Batalkan</button>
          <button v-else class='btn btn-danger'>
            Batalkan
        </button>
        <button 
          @click="selesai(props)"
          v-if="props.rowData.Status == 'on-going'"
          class='btn btn-success mx-1'>
             Selesai
        </button>
        <button 
          v-else
          class='btn btn-success mx-1'>
             Selesai
        </button>
      </template>
    </DataTable>
  </div>

  <div v-if="showModal" class="modal">
      <div class="modal-content">
        <!-- Modal content -->
        <div class="modal-header">
          <h5 class="modal-title">Tambah Acara</h5>
          <button type="button" @click="showModal = false" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addFrom">
            <div class="mb-3">
              <label for="tanggal">Tanggal</label>
              <input type="date" class="form-control" id="tanggal" placeholder="date">
            </div>
            <div class="mb-3">
              <label for="nama_acara">Nama Acara</label>
              <input type="text" class="form-control" id="nama_acara" placeholder="Nama Acara">
            </div>
            <div class="mb-3">
              <label for="keterangan">Keterangan</label>
              <textarea class="form-control" id="keterangan" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showModal = false" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
        </div>
      </div>
    </div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';

/* Modal styles */
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

.modal-content {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 80%;
  overflow-y: auto;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>