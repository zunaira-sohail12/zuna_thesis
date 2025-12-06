A repository for the utility of 3D geometrical STEP file feature analysis and processing using dataset and actual STEP file. This is a thesis project by Zunaira Sohail for Master in AI for business with title of Analyze fillets, chamfers and holes on 3D geometrical STEP file. This README is a complete, document of how to use this project, explain how to reproduce , analyse, processing, experiments and results, and help collaborators contribute.
 
* Backend code (data processing, model training, analysis)
* Frontend or UI components (if applicable)
* Jupyter-Notebook(s) / experimental notebooks (for experiments, visualizations, analysis)
* Colab-ready code to allow easy replication of experiments
* Put simply: this repo centralizes all materials relevant to the thesis — from raw data and preprocessing to final results and documentation.
If you prefer, you can treat this as a research reproducibility package: you should be able to run the experiments and analyses from scratch.

## Repository Structure
/Backend/         → backend scripts, data pipelines, model training code  /Frontend/        → frontend or visualization code (if any)  /colab code/      → ready-to-run Jupyter / Google Colab notebooks for experiments  /Files/           → dataset files, results, output, logs, documentation, etc.  
Note: adjust the above structure and descriptions if your actual folder names / roles differ.

## Features & What It Does
* Data preprocessing and cleaning pipelines (if your thesis involves data)
* Model training / experimentation code (e.g. ML or statistical models)
* Analyses and result generation (e.g. metrics, plots, tables)
* Interactive notebooks for visualization and exploratory analysis
Ready-to-use scripts and notebooks to reproduce results (e.g. via Colab)
If you already have results or outputs stored (e.g. in /Files/), users can review them directly without rerunning lengthy experiments.

## Installation & Setup
* Clone the repository
* (Optional) Create a virtual environment (recommended)
* Install dependencies. If you maintain a requirements.txt or environment.yml, list them here. For example:
(If you don’t have such a file yet, please create one with all required libraries — this helps reproducibility.)
Run a notebook or script. For example, to launch the main notebook:

## Usage and Examples
* Inside the /colab code/ folder you’ll find notebooks meant to reproduce key experiments. Launch them in Google Colab (or locally) and follow the instructions in the notebook to:
* Preprocess data
* Train models / run experiments
* Generate results, plots, metrics
Optionally, you can skip expensive retraining and inspect precomputed outputs stored under /Files/ (if available).
If there are small scripts (e.g. .py files) in /Backend/ or /Frontend/, you can run them from command line — e.g.:
python Backend/train_model.py --config configs/config.yaml
(Adjust the command according to your own structure — e.g. name of script, config, arguments)

## Results and Findings
* Describe here what the thesis found. E.g.:
* Key metrics (accuracy, loss, evaluation results)
* Visualizations (plots, graphs)
* Observations, insights, conclusions
If you already included output files / plots in /Files/, reference where to find them (e.g. Files/plots/, Files/results.csv, etc.).

## Contributing & Reproducing
* This project is research-oriented rather than production  but if you wish to reproduce or extend experiments:
* Fork or clone the repo
* Install dependencies and environment as above

Use the provided notebooks/scripts to rerun experiments
* If you spot bugs or want to add improvements, feel free to submit an issue or PR
* If you add new code (e.g. new experiments, analysis scripts), please also add documentation (e.g. README update / comments) so others can understand.

## Acknowledgments & References
* For transparency and reproducibility, list any:
* Data sources (where you got data from)
* External libraries / frameworks used
* Papers or references that inspired or supported your methodology
* Collaborators or advisors (if any)

For example:
* Dataset: Generating dataset from 3D geomatrical STEP file 
* Libraries: NumPy, Pandas, scikit-learn, etc.
* Reference paper: From IEEE research explorer

## License
* State the license under which you release your thesis code.
* For example:
* MIT License
or any academic / open-source license you choose. Including a license helps others know what they're allowed to do with your code/data.
* jupyter notebook# or open the relevant .ipynb file in /colab code/ 
* pip install -r requirements.txt
* python3 -m venv env source env/bin/activate  # On Windows: env\Scripts\activate 
* git clone https://github.com/zunaira-sohail12/zuna_thesis.gitcd 

Citing this work
- If you use this repository for research or in a paper, please cite:
  - Author: Zunaira Sohail
  - Title and link: "Analyze fillets, chamfers and holes on 3D geometrical STEP file" — https://github.com/zunaira-sohail12/zuna_thesis

Contact
- Author: Zunaira Sohail — GitHub: @zunaira-sohail12
- Email: x23391154@student.ncirl.ie
- For questions, open an issue on GitHub.
