import { StatusCodes } from 'http-status-codes';
import Job from '../models/JobModel.js';

export const getAllJobs = async (req,res)=>{
    const {search, jobStatus, jobType, sort} = req.query

    const queryObject = {
        createdBy: req.user.userId,
    }
    if(search){
        queryObject.$or = [
            {position:{$regex:search, $options: 'i'}},
            {company:{$regex:search, $options: 'i'}}
        ]
    }

    if(jobStatus && jobStatus !== 'all'){
        queryObject.jobStatus = jobStatus
    }

    if(jobType && jobType !== 'all'){
        queryObject.jobType = jobType
    }

    const sortOptions = {
        newest:'-createdAt',
        oldest:'createdAt',
        'a-z':'position',
        'z-a':'-position',
        }

    const sortKey = sortOptions[sort] || sortOptions.newest

    //setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip =(page - 1) * limit

    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)

    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage:page, jobs})
}

export const getSingleJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

export const editJob = async (req,res)=>{
    const editedJob = await Job.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    return res.status(StatusCodes.OK).json({msg:{job}})
}

export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};