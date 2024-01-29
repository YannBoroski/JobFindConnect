<?php
class Bdd
{
  private $bdd;

  public function __construct()
  {
    $dbUser = 'root';
    $dbPwd = '';
    $dsn = 'mysql:host=localhost;dbname=JFC;charset=utf8';

    try {
      $this->bdd = new PDO($dsn, $dbUser, $dbPwd);
    } catch (PDOException $e) {
      echo $e->getMessage();
    }
  }
  public function createProfil($pass,$username,$firstname,$lastname,$birth_date,$mail,$role,$phone,$visibilitee){
    $dateCreation = date("Y-m-d");
    $req = $this->bdd->prepare("INSERT INTO Users (password_hash, username, firstname, lastname, date_de_naissance, mail, role, phone_number, statutVisibilitee, date_de_creation, last_login) VALUES (:pass, :username, :firstname, :lastname, :birth_date, :mail, :role, :phone, :visibilitee, :date_creation, :date_creation )");
    $req->execute(['pass' => $pass, 'username' => $username, 'firstname' => $firstname, 'lastname' => $lastname, 'birth_date' => $birth_date, 'mail' => $mail, 'role' => $role, 'phone' => $phone, 'visibilitee' => $visibilitee, 'date_creation' => $dateCreation]);

  }
  public function getId($pass,$username){
    $req = $this->bdd->prepare("SELECT id FROM users WHERE password = :pass AND username = :username");
    $req->execute(['pass' => $pass, 'username' => $username]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getProfil($id)
  {
    $req = $this->bdd->prepare("SELECT Users.username,Users.firstname, Users.lastname, Users.mail, Users.phone_number, Users.date_de_naissance, Users.statutVisibilitee, Users.role, Users.last_login, Users.bio, Users.pfp,Users.date_de_creation,Users.isVerified,Users.urlCV,Users.profileLinkedin,
                                  GROUP_CONCAT(DISTINCT Companies.nom SEPARATOR ', ') AS company_names, 
                                  GROUP_CONCAT(DISTINCT Domaine.Nom SEPARATOR ', ') AS domain_names
                                  FROM Users
                                  LEFT JOIN Association ON Users.id = Association.id_User
                                  LEFT JOIN Companies ON Association.id_Company = Companies.id
                                  LEFT JOIN UserDomaine ON Users.id = UserDomaine.id_User
                                  LEFT JOIN Domaine ON UserDomaine.id_Domaine = Domaine.id
                                  WHERE Users.id = :id
                                  GROUP BY Users.id;");

    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getProfilUnlock($id)
  {
    $req = $this->bdd->prepare("SELECT * FROM Users WHERE id = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getAllProfilid(){
    $req = $this->bdd->prepare("SELECT id FROM Users");
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getPass($username)
  {
    $req = $this->bdd->prepare("SELECT password_hash FROM Users WHERE username = :username");
    $req->execute(['username' => $username]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    $hashed_password = $result[0]['password_hash'];
    return $hashed_password;
  }
  public function loginProfil($username, $password)
  {
    $req = $this->bdd->prepare("SELECT Users.id FROM Users WHERE username = :username AND password_hash = :password");
    $req->execute(['username' => $username, 'password' => $password]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function lastLogin($id){
    try {
      $date = date("Y-m-d");
      $req = $this->bdd->prepare("UPDATE Users SET last_login = :date WHERE id = :id");
      $req->execute(['date' => $date, 'id' => $id]);
      return true;
    } catch (PDOException $e) {
      // Log or display the error message
      return error_log("Error updating last login: " . $e->getMessage());
    }
  }
  public function updateProfil($id, $columnToChange, $value)
  {
    $req = $this->bdd->prepare("UPDATE Users SET $columnToChange = :value WHERE id = :id");
    $req->execute(['id' => $id, 'value' => $value]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function updateDomain($id, $columnToChange, $value)
  {
    $req = $this->bdd->prepare("UPDATE Domaine SET $columnToChange = :value WHERE id = :id");
    $req->execute(['id' => $id, 'value' => $value]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function updateCompany($id, $columnToChange, $value)
  {
    $req = $this->bdd->prepare("UPDATE Companies SET $columnToChange = :value WHERE id = :id");
    $req->execute(['id' => $id, 'value' => $value]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function createDomain($Nom, $Description, $SalaireMoyen, $NiveauEduc, $tendanceMarche){
    $req = $this->bdd->prepare("INSERT INTO Domaine (Nom, Description, SalaireMoyen, NiveauEduc, tendanceMarche) VALUES (:Nom, :Description, :SalaireMoyen, :NiveauEduc, :tendanceMarche)");
    $req->execute(['Nom' => $Nom, 'Description' => $Description, 'SalaireMoyen' => $SalaireMoyen, 'NiveauEduc' => $NiveauEduc, 'tendanceMarche' => $tendanceMarche]);
    return true;
  }
  public function domainExist($Nom){
    $req = $this->bdd->prepare("SELECT * FROM Domaine WHERE Nom = :Nom");
    $req->execute(['Nom' => $Nom]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) > 0) {
      return true;
    } else {
      return false;
    }
  }
  public function profilExist($username){
    $req = $this->bdd->prepare("SELECT * FROM Users WHERE username = :username");
    $req->execute(['username' => $username]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) > 0) {
      return true;
    } else {
      return false;
    }
  }
  public function getEntreprise($id){
    $req = $this->bdd->prepare("SELECT Companies.nom, Companies.Logo, Companies.description, Companies.URL, Companies.Secteur_activitee, Companies.taille, Companies.date_de_fondation, Companies.siegeSocial, Companies.mail, Companies.phone, Companies.estVerifiee FROM Companies WHERE Companies.id = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getProfilRole($id){
    $req = $this->bdd->prepare("SELECT role FROM Users WHERE id = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getDomains($boolean){
    if ($boolean){
      $req = $this->bdd->prepare("SELECT * FROM Domaine");
    } else {
      $req = $this->bdd->prepare("SELECT * FROM Domaine WHERE estValide = 1");
    }
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function deleteDomain($id){
    $req = $this->bdd->prepare("DELETE FROM Domaine WHERE id = :id");
    $req->execute(['id' => $id]);
    return true;
  }
  public function deleteCompany($id){
    $req = $this->bdd->prepare("DELETE FROM Companies WHERE id = :id");
    $req->execute(['id' => $id]);
    return true;
  }
  public function acceptDomain($id){
    $req = $this->bdd->prepare("UPDATE Domaine SET estValide = 1 WHERE id = :id");
    $req->execute(['id' => $id]);
    return true;
  }
  public function acceptCompany($id){
    $req = $this->bdd->prepare("UPDATE Companies SET estVerifiee = 1 WHERE id = :id");
    $req->execute(['id' => $id]);
    return true;
  }
  public function getEntreprises(){
    $req = $this->bdd->prepare("SELECT * FROM Companies");
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  public function createAd($titre, $description, $job_type, $salary_range, $expiration_date, $required_experiences, $required_education, $location, $isRemote, $id_Company, $id_Domaine, $titleJob){
    $req = $this->bdd->prepare("INSERT INTO Advertisements (description, titre, job_type, Salary_range, posted_date, expiration_date, required_experiences, required_education, location, isRemote, id_Company, id_Domaine, Title_of_job) 
    VALUES (:description, :titre, :job_type, :salary_range, :posted_date, :expiration_date, :required_experiences, :required_education, :location, :isRemote, :id_Company, :id_Domaine, :titleJob)
    ");
    $req->execute(['description' => $description, 'titre' => $titre, 'job_type' => $job_type, 'salary_range' => $salary_range, 'posted_date' => date("Y-m-d"), 'expiration_date' => $expiration_date, 'required_experiences' => $required_experiences, 'required_education' => $required_education, 'location' => $location, 'isRemote' => $isRemote, 'id_Company' => $id_Company, 'id_Domaine' => $id_Domaine, 'titleJob' => $titleJob]);
    return true;
  }
  public function getCompaniesByPdgId($id){
    $req = $this->bdd->prepare("SELECT * FROM Companies WHERE Pdg_id = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function createEntreprise($nom, $description, $URL, $Secteur_activitee, $taille, $date_de_fondation, $siegeSocial, $mail, $phone, $Pdg_id){
    $req = $this->bdd->prepare("INSERT INTO Companies (nom, description, URL, Secteur_activitee, taille, date_de_fondation, siegeSocial, mail, phone, Pdg_id) VALUES (:nom, :description, :URL, :Secteur_activitee, :taille, :date_de_fondation, :siegeSocial, :mail, :phone, :Pdg_id)");
    $req->execute(['nom' => $nom, 'description' => $description, 'URL' => $URL, 'Secteur_activitee' => $Secteur_activitee, 'taille' => $taille, 'date_de_fondation' => $date_de_fondation, 'siegeSocial' => $siegeSocial, 'mail' => $mail, 'phone' => $phone, 'Pdg_id' => $Pdg_id]);
    return true;
  }
  public function entrepriseExist($nom){
    $req = $this->bdd->prepare("SELECT * FROM Companies WHERE nom = :nom");
    $req->execute(['nom' => $nom]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) > 0) {
      return true;
    } else {
      return false;
    }
  }
  public function getEntrepriseByPDG($id){
    $req = $this->bdd->prepare("SELECT * FROM Companies WHERE Pdg_id = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getDomainsByUserId($id){
    $req = $this->bdd->prepare("SELECT Domaine.Nom, Domaine.id FROM Domaine
                                INNER JOIN UserDomaine ON Domaine.id = UserDomaine.id_Domaine
                                INNER JOIN Users ON UserDomaine.id_User = Users.id
                                WHERE Users.id = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function linkDomainToUser($id ,$domainId){
    $req = $this->bdd->prepare("SELECT * FROM UserDomaine WHERE id_User = :id AND id_Domaine = :domainId");
    $req->execute(['id' => $id, 'domainId' => $domainId]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) > 0) {
      return false;
    } else {
      $req = $this->bdd->prepare("INSERT INTO UserDomaine (id_User, id_Domaine) VALUES (:id, :domainId)");
      $req->execute(['id' => $id, 'domainId' => $domainId]);
      return true;
    }
  }
  public function getAdOfACompany($id) {
    $req = $this->bdd->prepare("SELECT Advertisements.id, Advertisements.description, Advertisements.titre, Advertisements.job_type, Advertisements.Salary_range, Advertisements.posted_date, Advertisements.expiration_date, Advertisements.required_experiences, Advertisements.required_education, Advertisements.Title_of_job, Advertisements.location, Advertisements.view_count, Advertisements.status, Advertisements.isRemote, Advertisements.Langues, Advertisements.Apports, Advertisements.id_Company, Advertisements.id_Domaine, Domaine.Nom FROM Advertisements 
    INNER JOIN Domaine ON Advertisements.id_Domaine = Domaine.id
    WHERE id_Company = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
  public function getAdWithCorrespondingDomainsWithUser($id){
    $req = $this->bdd->prepare("SELECT Advertisements.id, Advertisements.description, Advertisements.titre, Advertisements.job_type, Advertisements.Salary_range, Advertisements.posted_date, Advertisements.expiration_date, Advertisements.required_experiences, Advertisements.required_education, Advertisements.location, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Domaine.Nom as 'DomainNom', Companies.nom as 'CompanyNom', Companies.id as 'CompanyId'
                                FROM Advertisements
                                INNER JOIN Domaine ON Advertisements.id_Domaine = Domaine.id
                                INNER JOIN UserDomaine ON Domaine.id = UserDomaine.id_Domaine
                                INNER JOIN Users ON UserDomaine.id_User = Users.id
                                INNER JOIN Companies ON Advertisements.id_Company = Companies.id
                                WHERE Users.id = :id");
    $req->execute(['id' => $id]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;

  }
  public function getAllAdsAndDomainsAndCompanyNameWithIt(){
    $req = $this->bdd->prepare("SELECT Advertisements.id, Advertisements.description, Advertisements.titre, Advertisements.job_type, Advertisements.Salary_range, Advertisements.posted_date, Advertisements.expiration_date, Advertisements.required_experiences, Advertisements.required_education, Advertisements.location, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Advertisements.isRemote, Advertisements.id_Company, Advertisements.id_Domaine, Advertisements.Title_of_job, Domaine.Nom as 'DomainNom', Companies.nom as 'CompanyNom', Companies.id as 'CompanyId'
                                FROM Advertisements
                                INNER JOIN Domaine ON Advertisements.id_Domaine = Domaine.id
                                INNER JOIN Companies ON Advertisements.id_Company = Companies.id");
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function updateAd($id, $column, $value){
    $req = $this->bdd->prepare("UPDATE Advertisements SET $column = :value WHERE id = :id");
    $req->execute(['id' => $id, 'value' => $value]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;

  }
  public function deleteAd($id){
    $req = $this->bdd->prepare("DELETE FROM Advertisements WHERE id = :id");
    $req->execute(['id' => $id]);
    return true;
  }
  public function deleteDomainLink($idDomain, $idUser){
    $req = $this->bdd->prepare("DELETE FROM UserDomaine WHERE id_Domaine = :idDomain AND id_User = :idUser");
    $req->execute(['idDomain' => $idDomain, 'idUser' => $idUser]);
    return true;
  }
  public function createMessage($idUser,$idAd,$message){
    $req = $this->bdd->prepare("INSERT INTO Messages (idUser, idAd, Message) VALUES (:idUser, :idAd, :message)");
    $req->execute(['idUser' => $idUser, 'idAd' => $idAd, 'message' => $message]);
    return true;
  }

  public function createMessageOffline($idUser, $idAd, $message, $firstName, $lastName, $email, $phone){
    $req = $this->bdd->prepare("INSERT INTO Messages (idUser, idAd, Message, firstName, lastName, email, phone) VALUES (:idUser, :idAd, :message, :firstName, :lastName, :email, :phone)");
    $req->execute(['idUser' => $idUser, 'idAd' => $idAd, 'message' => $message, 'firstName' => $firstName, 'lastName' => $lastName, 'email' => $email, 'phone' => $phone]);
    return true;
  }
  public function setMessageStatus($idMessage,$Status){
    $req = $this->bdd->prepare("UPDATE Messages SET Status = :Status WHERE id = :idMessage");
    $req->execute(['idMessage' => $idMessage, 'Status' => $Status]);
    return true;
  }
  public function deleteMessage($idMessage){
    $req = $this->bdd->prepare("DELETE FROM Messages WHERE id = :idMessage");
    $req->execute(['idMessage' => $idMessage]);
    return true;
  }
  public function getMessagesWithStatusByPdgId($idPdg){
    $req = $this->bdd->prepare("SELECT Messages.id, Messages.idUser, Messages.idAd, Messages.Message, Messages.Status, Advertisements.titre, 
    CASE WHEN Messages.idUser = 31 THEN Messages.firstName ELSE Users.firstName END AS firstName,
    CASE WHEN Messages.idUser = 31 THEN Messages.lastName ELSE Users.lastName END AS lastName,
    CASE WHEN Messages.idUser = 31 THEN Messages.email ELSE Users.mail END AS email,
    CASE WHEN Messages.idUser = 31 THEN Messages.phone ELSE Users.phone_number END AS phone
    FROM Messages
    INNER JOIN Advertisements ON Messages.idAd = Advertisements.id
    INNER JOIN Users ON Messages.idUser = Users.id
    INNER JOIN Companies ON Advertisements.id_Company = Companies.id
    WHERE Companies.Pdg_id = :idPdg");
$req->execute(['idPdg' => $idPdg]);
$result = $req->fetchAll(PDO::FETCH_ASSOC);
return $result;
  }
  public function getMessagesWithUserId($userId){
    $req = $this->bdd->prepare("SELECT Messages.id, Messages.idUser, Messages.idAd, Messages.Message, Messages.Status, Advertisements.titre, Users.username FROM Messages
                                INNER JOIN Advertisements ON Messages.idAd = Advertisements.id
                                INNER JOIN Users ON Messages.idUser = Users.id
                                WHERE Users.id = :userId");
    $req->execute(['userId' => $userId]);
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  public function getAllMessages(){
    $req = $this->bdd->prepare("SELECT Messages.id, Messages.idUser, Messages.idAd, Messages.Message, Messages.Status, Advertisements.titre, 
    CASE WHEN Messages.idUser = 31 THEN Messages.firstName ELSE Users.firstName END AS firstName,
    CASE WHEN Messages.idUser = 31 THEN Messages.lastName ELSE Users.lastName END AS lastName,
    CASE WHEN Messages.idUser = 31 THEN Messages.email ELSE Users.mail END AS email,
    CASE WHEN Messages.idUser = 31 THEN Messages.phone ELSE Users.phone_number END AS phone,
    Users.username, Companies.nom as 'CompanyNom' FROM Messages
    INNER JOIN Advertisements ON Messages.idAd = Advertisements.id
    INNER JOIN Users ON Messages.idUser = Users.id
    INNER JOIN Companies ON Advertisements.id_Company = Companies.id");
    $req->execute();
    $result = $req->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}
}
