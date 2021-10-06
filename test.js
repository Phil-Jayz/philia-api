const { generatePair, genereteUserPath } = require('./utils/rsa');

//generatePair();
//axiosTest();
//genereteUserPath("philodi");


// [
// 	{
// 		"name":"ALLERGY AND IMMUNOLOGYs",
// 		"description": "Specialists in allergy and immunology work with both adult and pediatric patients suffering from allergies and diseases of the respiratory tract or immune system. They may help patients suffering from common diseases such as asthma, food and drug allergies, immune deficiencies, and diseases of the lung. Specialists in allergy and immunology can pursue opportunities in research, education, or clinical practice."
// 	},
// 	{
// 		"name":"ANESTHESIOLOGY",
// 		"description": "Anesthesiology is the branch of medicine dedicated to pain relief for patients before, during, and after surgery. The American Board of Anesthesiology outlines the following subspecialties within the field in the following areas of care: • Critical care medicine • Hospice and palliative care • Pain medicine • Pediatric anesthesiology • Sleep medicine"
// 	},
// 	{
// 		"name":"DERMATOLOGY",
// 		"description": "Dermatologists are physicians who treat adult and pediatric patients with disorders of the skin, hair, nails, and adjacent mucous membranes. They diagnose everything from skin cancer, tumors, inflammatory diseases of the skin, and infectious diseases. They also perform skin biopsies and dermatological surgical procedures."
// 	},
// 	{
// 		"name":"DIAGNOSTIC RADIOLOGY",
// 		"description": "Physicians specializing in diagnostic radiology are trained to diagnose illnesses in patients through the use of x-rays, radioactive substances, sound waves in ultrasounds, or the body’s natural magnetism in magnetic resonance images (MRIs)."
// 	},
// 	{
// 		"name":"EMERGENCY MEDICINE",
// 		"description": "Physicians specializing in emergency medicine provide care for adult and pediatric patients in emergency situations. These specialists provide immediate decision making and action to save lives and prevent further injury. They help patients in the pre-hospital setting by directing emergency medical technicians and assisting patients once they arrive in the emergency department."
// 	},
// 		{
// 		"name":"FAMILY MEDICINE",
// 		"description": "While many medical specialties focus on a certain function of the body or particular organ, family medicine focuses on integrated care and treating the patient as a whole. Physicians who specialize in family medicine treat patients of all ages. They are extensively trained to provide comprehensive health care and treat most ailments."
// 	},
// 	{
// 		"name":"INTERNAL MEDICINE",
// 		"description": "An internist is a physician who treats diseases of the heart, blood, kidneys, joints, digestive, respiratory, and vascular systems of adolescent, adult, and elderly patients. These physicians provide long-term and comprehensive care in hospitals and offices. Because they undergo primary care training on internal medicine, these physicians also address disease prevention, wellness, substance abuse, and mental health."
// 	},
// 	{
// 		"name":"MEDICAL GENETICS",
// 		"description": "A medical geneticist is a physician who treats hereditary disorders and diagnoses diseases that are caused by genetic defects. Medical geneticists may provide patients with therapeutic interventions and specialized counseling. They also educate patients and their families on their diagnoses and how to cope with their genetic disorder. Medical geneticists conduct cytogenetic, radiologic, and biochemical testing and scientific research in the field."
// 	},
// 	{
// 		"name":"NEUROLOGY",
// 		"description": "Neurology is the specialty within the medical field pertaining to nerves and the nervous system. Neurologists diagnose and treat diseases of the brain, spinal cord, peripheral nerves, muscles, autonomic nervous system, and blood vessels. Much of neurology is consultative, as neurologists treat patients suffering from strokes, Alzheimer’s disease, seizure disorders, and spinal cord disorders."
// 	},
// 	{
// 		"name":"NUCLEAR MEDICINE",
// 		"description": "Physicians who practice nuclear medicine are called nuclear radiologists or nuclear medicine radiologists. They use radioactive materials to diagnose and treat diseases. Utilizing techniques such as scintigraphy, these physicians analyze images of the body's organs to visualize certain diseases. They may also use radiopharmaceuticals to treat hyperthyroidism, thyroid cancer, tumors, and bone cancer."
// 	},
// 		{
// 		"name":"OBSTETRICS AND GYNECOLOGY",
// 		"description": "Obstetrician/gynecologists (OB/GYNs) care for the female reproductive system and associated disorders. This field of medicine encompasses a wide array of care, including the care of pregnant women, gynecologic care, oncology, surgery, and primary health care for women."
// 	},
// 	{
// 		"name":"OPHTHALMOLOGY",
// 		"description": "Physicians specializing in ophthalmology develop comprehensive medical and surgical care of the eyes. Ophthalmologists diagnose and treat vision problems. They may treat strabismus, diabetic retinopathy, or perform surgeries on cataracts or corneal transplantation."
// 	},
// 	{
// 		"name":"PATHOLOGY",
// 		"description": "A physician specializing in pathology studies the causes and nature of diseases. Through microscopic examination and clinical lab tests, pathologists work to diagnose, monitor, and treat diseases. They examine tissues, cells, and body fluids, applying biological, chemical, and physical sciences within the laboratory. They may examine tissues to determine whether an organ transplant is needed, or they may examine the blood of a pregnant woman to ensure the health of the fetus."
// 	},
// 		{
// 		"name":"PEDIATRICS",
// 		"description": "Physicians specializing in pediatrics work to diagnose and treat patients from infancy through adolescence. Pediatricians practice preventative medicine and also diagnose common childhood diseases, such as asthma, allergies, and croup."
// 	},
// 	{
// 		"name":"PHYSICAL MEDICINE AND REHABILITATION",
// 		"description": "Physicians specializing in physical medicine and rehabilitation work to help patients with disabilities of the brain, spinal cord, nerves, bones, joints, ligaments, muscles, and tendons. Physiatrists work with patients of all ages and design care plans for conditions, such as spinal cord or brain injury, stroke, multiple sclerosis, and musculoskeletal and pediatric rehabilitation. Unlike many other medical specialties, physiatrists work to improve patient quality of life, rather than seek medical cures."
// 	},
// 	{
// 		"name":"PREVENTIVE MEDICINE",
// 		"description": "Physicians specializing in preventative medicine work to prevent disease by promoting patient health and well-being. Their expertise goes far beyond preventative practices in clinical medicine, covering elements of biostatistics, epidemiology, environmental and occupational medicine, and even the evaluation and management of health services and healthcare organizations. The field combines interdisciplinary elements of medical, social, economic, and behavioral sciences to understand the causes of disease and injury in population groups."
// 	},
// 		{
// 		"name":"PSYCHIATRY",
// 		"description": "Physicians specializing in psychiatry devote their careers to mental health and its associated mental and physical ramifications. Understanding the connections between genetics, emotion, and mental illness, is important while psychiatrists also conduct medical laboratory and psychological tests to diagnose and treat patients."
// 	},
// 	{
// 		"name":"RADIATION ONCOLOGY",
// 		"description": "Physicians specializing in radiation oncology treat cancer with the use of high-energy radiation therapy. By targeting radiation doses in small areas of the body, radiation oncologists damage the DNA of cancer cells, preventing further growth. Radiation oncologists work with cancer patients, prescribing and implementing treatment plans while monitoring their progress throughout."
// 	},
// 	{
// 		"name":"SURGERY",
// 		"description": "Physicians specializing in surgery can choose to become general surgeons or pursue a subspecialty in a specific area of the body, type of patient, or type of surgery. General surgeons provide a wide variety of life-saving surgeries, such as appendectomies and splenectomies. They receive broad training on human anatomy, physiology, intensive care, and wound healing."
// 	},
// 	{
// 		"name":"UROLOGY",
// 		"description": "Urology is the health care segment that cares for the male and female urinary tract, including kidneys, ureters, bladder, and urethra. It also deals with the male sex organs. Urologists have knowledge of surgery, internal medicine, pediatrics, gynecology, and more."
// 	}
// 	]
 