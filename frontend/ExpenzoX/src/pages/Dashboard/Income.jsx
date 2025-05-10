import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { UserContext } from "../../context/UserContext";
const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const { user } = React.useContext(UserContext);
    const navigate = useNavigate()
    const getToken = window.localStorage.getItem("token")
    if(!getToken){
      return navigate("/login")
    }
  
  // Get All Income Details
  const fetchIncomeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      console.log("Income data fetched:", response.data);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    // Add income logic
  };

  // Delete Income
  const deleteIncome = async (id) => {
    // Delete income logic
  };

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {
    // Download logic
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        {loading ? (
          <div className="text-center text-gray-500">Loading income data...</div>
        ) : incomeData.length === 0 ? (
          <div className="text-center text-gray-500">No income data available.</div>
        ) : (
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        )}

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
          <div>Add Income Form</div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
